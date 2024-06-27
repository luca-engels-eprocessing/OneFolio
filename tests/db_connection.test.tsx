import {describe, expect,test,jest} from '@jest/globals';
import { MarketChart} from '@/components/chart';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as DB from '@/utils/db';
import fetchMock from 'fetch-mock';
import { BACKEND_URL } from '@/routes';




describe('Check Database Fuctions', () => {
    test('Should try to get toLowerCase\'d email', async () => {
        fetchMock.reset().get(BACKEND_URL+"/users/email/test.user@eprocessing.de",{email:"test.user@eprocessing.de",name:{firstname:"Test",lastname:"User"}})
        const user = await DB.getUserByEmail("Test.User@eProcessing.de")
        expect(user).toBeTruthy()
        expect(user.email).toEqual("test.user@eprocessing.de")
        expect(JSON.stringify(user.name)).toEqual(JSON.stringify({"firstname": "Test", "lastname": "User"}))
    });
    
    test('should request a update for user', async () => {
        fetchMock.reset().put(BACKEND_URL+"/users/1234/",{email:"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"User"}})
        const user = await DB.updateUser("1234",{"email":"test.user2@eprocessing.de"})
        const lastCall = fetchMock.lastCall()!
        expect(user).toBeTruthy()
        expect(JSON.stringify(user)).toEqual(JSON.stringify({email: 'test.user2@eprocessing.de',name: { firstname: 'Test', lastname: 'User' }}))
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toEqual(JSON.stringify({"email":"test.user2@eprocessing.de"}))
    });

    test('should remove a item from user on patch', async () => {
        fetchMock.reset().patch(BACKEND_URL+"/users/1234/",{name:{firstname:"Test",lastname:"User"}})
        const user = await DB.removeFromUser("1234",{"email":"test.user2@eprocessing.de"})
        const lastCall = fetchMock.lastCall()!
        expect(user).toBeTruthy()
        expect(JSON.stringify(user)).toEqual(JSON.stringify({name: { firstname: 'Test', lastname: 'User' }}))
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toEqual(JSON.stringify({"email":"test.user2@eprocessing.de"}))
    });

    test('should get user on get', async () => {
        fetchMock.reset().get(BACKEND_URL+"/users/1234",{email:"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"User"}})
        const user = await DB.getUserById("1234")
        const lastCall = fetchMock.lastCall()!
        expect(user).toBeTruthy()
        expect(JSON.stringify(user)).toEqual(JSON.stringify({email:"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"User"}}))
    });

    test('should request a update for user', async () => {
        fetchMock.reset().post(BACKEND_URL+"/users/",{email:"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"User"}})
        const user = await DB.createUser({"email":"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"user"},password:"!asd123",address:{}})
        const lastCall = fetchMock.lastCall()!
        expect(user).toBeTruthy()
        expect(JSON.stringify(user)).toEqual(JSON.stringify({email: 'test.user2@eprocessing.de',name: { firstname: 'Test', lastname: 'User' }}))
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toEqual(JSON.stringify({"email":"test.user2@eprocessing.de",name:{firstname:"Test",lastname:"user"},password:"!asd123",address:{}}))
    });

    test('should add multiple new investments', async () => {
        fetchMock.reset().post(BACKEND_URL+"/investments/addMany",201)
        const response = await DB.createMultipleInvestment([{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"}])
        const lastCall = fetchMock.lastCall()!
        expect(response.status).toEqual(201)
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toEqual(JSON.stringify([{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"}]))
    });
    test('should get all investmetns by a user', async () => {
        fetchMock.reset().get(BACKEND_URL+"/users/investments/1234",[{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"}])
        const response = await DB.getInvestmentsByUserId("1234")
        const lastCall = fetchMock.lastCall()!
        expect(response).toBeTruthy()
        expect(JSON.stringify(response)).toEqual(JSON.stringify([{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"}]))
    });
    test('should delete a investment', async () => {
        fetchMock.reset().delete(BACKEND_URL+"/investments/123",201)
        const response = await DB.deleteInvestmentById("123")
        expect(response!.status).toEqual(201)
    });
    test('should change a investment', async () => {
        fetchMock.reset().put(BACKEND_URL+"/investments/123/",201)
        const response = await DB.updateInvestmentById("123",{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"})
        const lastCall = fetchMock.lastCall()!
        expect(response!.status).toEqual(201)
        expect(lastCall[1]).toBeTruthy();
        expect(lastCall[1]!.body).toEqual(JSON.stringify({"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"}))
    });
    test('should change a investment', async () => {
        fetchMock.reset().get(BACKEND_URL+"/users/123/cursor",{"data":{title:"Test",date:"12.12.1212",Summe:"123"},userId:"Asd123"})
        const response = await DB.getLatestCursorOrUndefined("123")
        expect(response).toBeTruthy()
    });
    test('should change a investment', async () => {
        fetchMock.reset().get(BACKEND_URL+"/users/123/cursor",404)
        const response = await DB.getLatestCursorOrUndefined("123")
        expect(response).toBeUndefined()
    });
})

describe('Check Plaid Fuctions', () => {


})