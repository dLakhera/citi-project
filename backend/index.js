const AWS = require('aws-sdk');
var crypto = require('crypto');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamoTableName = 'citi-emp-table';
const empPath = "/employee";
const empsPath = "/employees";
const leavePath = "/leave";
const reviewPath = "/review";
const auth = "/auth";


exports.handler = async function (event) {
    let response;
    console.log('Request event: ', event.body);
    const query = event.queryStringParamters;
    switch (true) {
        // Get all employees
        case event.httpMethod === 'GET' && event.path === empsPath:
            response = await getEmployees();
            break;

        // Employee
        case event.httpMethod === 'GET' && event.path === empPath:
            response = await getEmployee(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === empPath:
            response = await createEmployee(JSON.parse(event.body));
            break;
        case event.httpMethod === 'DELETE' && event.path === empPath:
            response = await dropEmployee(JSON.parse(event.body).empID);
            break;

        // Leave
        case event.httpMethod === 'GET' && event.path === leavePath:
            response = await getLeave(JSON.parse(event.body).empID);
            break;
        case event.httpMethod === 'PATCH' && event.path === leavePath:
            response = await updateLeave(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === leavePath:
            response = await postLeave(JSON.parse(event.body));
            break;

        // Reviews
        case event.httpMethod === 'GET' && event.path === reviewPath:
            response = await getReviews(JSON.parse(event.body).empId);
            break;
        case event.httpMethod === 'POST' && event.path === reviewPath:
            response = await postReviews(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === auth:
            response = await getEmployee(JSON.parse(event.body));
            break;
    }

    return response;
}


async function getEmployees() {
    const params = {
        TableName: dynamoTableName
    }

    const allEmployees = await scanEmployessTable(params, []);
    const body = {
        employess: allEmployees
    };

    return buildResponse(200, body);
}

async function scanEmployessTable(scanParams, itemsArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemsArray = itemsArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
            return await scanEmployessTable(scanParams, itemsArray);
        }
        return itemsArray;
    } catch (error) {
        console.log(error);
    }
};


async function getEmployee(requestBody) {
    console.log("rabndopajmdoasd: ", requestBody.empId, "adskajsdlajdls: ", requestBody.password);
    const params = {
        TableName: dynamoTableName,
        Key: {
            "empId": requestBody.empId
        }
    }

    requestBody.password = crypto.createHash('sha256').update(requestBody.password).digest('base64');
    return await dynamodb.get(params).promise().then((response) => {
        if (response.Item.password === requestBody.password) {
            return buildResponse(200, response.Item);
        } else {
            return buildResponse(401, { message: "Unauthorised access" });
        }
    }, (error) => {
        console.error(error);
    });
}

async function createEmployee(requestBody) {
    const params = {
        TableName: dynamoTableName,
        Item: requestBody
    }

    params.Item.password = crypto.createHash('sha256').update(params.Item.password).digest('base64');

    return await dynamodb.put(params).promise().then(() => {
        const body = {
            OPERATION: "SAVE",
            Message: "Success",
            Item: requestBody
        }

        return buildResponse(200, body);
    }, error => {
        console.error(error);
    });
}

async function dropEmployee(empID) {
    const params = {
        TableName: dynamoTableName,
        Key: {
            empID: empID
        },
        ReturnValues: "ALL_OLD"
    }

    return await dynamodb.delete(params).promise().then((response) => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
    })
}

async function getLeave(empID) {
    const params = {
        TableName: 'citi-employee-leave',
        Key: {
            empID: empID
        }
    }

    return await dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
    }, (error) => {
        console.log(error);
    });
}


async function updateLeave(requestBody) {
    const params = {
        TableName: "citi-employee-leave",
        Key: {
            'empID': requestBody.empID
        },
        UpdateExpression: `set start_date = :start, end_date = :end, leave_of_days = :leave_days`,
        ExpressionAttributeValues: {
            ':start': requestBody.start,
            ':end': requestBody.end,
            ':leave_days': requestBody.leave_days
        },
        ReturnValues: 'UPDATED_NEW'
    }
    return await dynamodb.update(params).promise().then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
    })
}

async function postLeave(requestBody) {
    const params = {
        TableName: 'citi-employee-leave',
        Item: requestBody
    }

    return await dynamodb.put(params).promise().then(response => {
        const body = {
            OPERATION: "SAVE",
            Message: "Success",
            Item: requestBody
        }
        return buildResponse(200, body);
    }, error => {
        console.log(error);
    });
}

async function getReviews(empID) {
    const params = {
        TableName: 'citi-employee-reviews',
        Key: {
            "empId": empID
        }
    }

    return await dynamodb.get(params).promise().then((response) => {
        let itemsArray = [];
        itemsArray = itemsArray.concat(response.Item);
        const body = {
            OPERATION: "Get reviews",
            Message: "Success",
            Item: itemsArray
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error(error);
    });
}


async function postReviews(requestBody) {
    const params = {
        TableName: 'citi-employee-reviews',
        Item: requestBody
    }

    return await dynamodb.put(params).promise().then(response => {
        const body = {
            OPERATION: "SAVE",
            Message: "Success",
            Item: requestBody
        }
        return buildResponse(200, body);
    }, error => {
        console.log(error);
    });
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
