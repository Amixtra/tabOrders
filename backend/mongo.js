const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB 연결 설정
const { mongoUser, mongoHost, mongoPw, mongoDb } = process.env;
const mongoURI = `mongodb+srv://${mongoUser}:${encodeURIComponent(mongoPw)}@${mongoHost}${mongoDb}?retryWrites=true&w=majority`;

// MongoDB 연결
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch(err => console.log("MongoDB 연결 실패:", err));

// MongoDB 명령 실행 함수
async function mongo(command, table, params) {
  if (!command || !table || !params) { return {} }

  try {
    const collection = mongoose.connection.collection(table);

    switch (command.toUpperCase()) {
      case "SELECT":
        return await collection.find(params).toArray();

      case "INSERT":
        return await collection.insertOne(params);

      case "UPDATE":
        const { filter, update } = params;
        if(!filter || !update){ return {} }
        return await collection.updateMany(filter, { $set: update });

      case "DELETE":
        return await collection.deleteMany(params);

      default:
        return {}
    }
  } catch (error) {
    console.error(`MongoDB 명령 실행 중 오류: ${error.message}`);
    return {}
  }
}

module.exports = { mongo };