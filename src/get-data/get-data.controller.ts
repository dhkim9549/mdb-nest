import { Controller, Get, Query } from '@nestjs/common';
import { MongoClient } from "mongodb";

@Controller('get-data')
export class GetDataController {
  @Get()
  async findAll(@Query() query) {

    console.log("query = " + JSON.stringify(query));
    
    let q = query;
    q.i =  Number(query.i);

    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    let resData = {};

    try {
      await client.connect();

      const database = client.db("dbTest");

      const collection = database.collection("colTest");
      resData = await collection.find(q).limit(10).toArray();
      console.log(`resData = ${JSON.stringify(resData)}`);

    } catch (error) {
       throw error;
    } finally {
       await client.close();
    }

    return resData; 
  }
}
