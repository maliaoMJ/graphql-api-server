const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('express-cors');
const originData = [{
        id: 10000,
        name: 'superMario',
        gender: 'man',
        age: 23
    },
    {
        id: 10001,
        name: 'Jack',
        gender: 'man',
        age: 23
    },
    {
        id: 10002,
        name: 'Tom',
        gender: 'man',
        age: 23
    },
    {
        id: 10003,
        name: 'Alice',
        gender: 'woman',
        age: 23
    }
]

const app = express();
// Express 托管静态文件
app.use(express.static('public'));
// 设置API 跨域
app.use(cors({
    allowedOrigins: [
        'http://localhost:8080'
    ]
}))
const schema = buildSchema(`
	type User {
		name: String
		age: Int
		id: Int
		gender: String
	}
  type Query {
  	hello: String
  	users: [User!]
  	randomUser: User
  	userInfo(id:Int!):User
  }
`)

const rootValue = {
	hello: () => 'hello world',
	users: () => {
		return originData
	},
	randomUser: () => {
		let random = Number.parseInt(Math.random() * 3);
		return originData[random];
	},
	userInfo: ({id}) => {
		const tempData = originData.filter(item => item.id == id);
		return tempData[0]
	}
}

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
}));

app.listen(3000, () => {
    console.log("Now open localhost:3000!");
});