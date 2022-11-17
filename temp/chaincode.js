/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
const { getEnabledCategories } = require('trace_events');

class DiplomaManagement extends Contract {

    async InitLedger(ctx) {
        const diplomas = [
            // {
            //     ID: '187238',
            //     Fullname: 'Huy Hoang',
            //     DateOfBirth: '06/06/2001',
            //     Gender: Nam,
            //     Certificate: 'BANG TOT NGHIEP DAI HOC',
            //     Speciality: 'Cong nghe thong tin',
            //     GraduationYear: '2019',
            //     School: 'Dai hoc BKDN',
            //     Rank: 'Gioi',
            //     ModeOfStudy: 'Chinh quy',
            //     RegNo: '34567',
            //     UrlImage: 'abc.com/a.jpeg',
            // },    
        ];

        for (const diploma of diplomas) {
            diploma.docType = 'diploma';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(diploma.ID, Buffer.from(stringify(sortKeysRecursive(diploma))));
        }
    }

    // CreateDiploma issues a new diploma to the world state with given details.
    async CreateDiploma(ctx, id, fullname, dateofbirth, gender, certificate, speciality, graduationyear, school, rank, modeofstudy, regno, urlimage, status) {
        const exists = await this.DiplomaExists(ctx, id);
        if (exists) {
            throw new Error(`The diploma ${id} already exists`);
        }

        const diploma = {
            ID: id,
            Fullname: fullname,
            DateOfBirth: dateofbirth,
            Gender: gender,
            Certificate: certificate,
            Speciality: speciality,
            GraduationYear: graduationyear,
            School: school,
            Rank: rank,
            ModeOfStudy: modeofstudy,
            RegNo: regno,
            UrlImage: urlimage,
            Status: status,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(diploma))));
        return JSON.stringify(diploma);
    }

    // ReadDiploma returns the diploma stored in the world state with given id.
    async ReadDiploma(ctx, id) {
        const diplomaJSON = await ctx.stub.getState(id); // get the diploma from chaincode state
        if (!diplomaJSON || diplomaJSON.length === 0) {
            throw new Error(`The diploma ${id} does not exist`);
        }
        return diplomaJSON.toString();
    }

    // UpdateDiploma updates an existing diploma in the world state with provided parameters.
    async UpdateDiploma(ctx, id, fullname, dateofbirth, gender, certificate, speciality, graduationyear, school, rank, modeofstudy, regno, urlimage, status) {
        const exists = await this.DiplomaExists(ctx, id);
        if (!exists) {
            throw new Error(`The diploma ${id} does not exist`);
        }

        // overwriting original diploma with new diploma
        const updatedDiploma = {
            ID: id,
            Fullname: fullname,
            DateOfBirth: dateofbirth,
            Gender: gender,
            Certificate: certificate,
            Speciality: speciality,
            GraduationYear: graduationyear,
            School: school,
            Rank: rank,
            ModeOfStudy: modeofstudy,
            RegNo: regno,
            UrlImage: urlimage,
            Status: status,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedDiploma))));
    }

    // DeleteDiploma deletes an given diploma from the world state.
    async DeleteDiploma(ctx, id) {
        const exists = await this.DiplomaExists(ctx, id);
        if (!exists) {
            throw new Error(`The diploma ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // UpdateDiplomaStatus updates the Status field of diploma with given id in the world state.
    async UpdateDiplomaStatus(ctx, id, newStatus) {
        const diplomaString = await this.ReadDiploma(ctx, id);
        const diploma = JSON.parse(diplomaString);
        const oldStatus = diploma.Status;
        diploma.Status = newStatus;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(diploma))));
        return oldStatus;
    }

    // DiplomaExists returns true when diploma with given ID exists in world state.
    async DiplomaExists(ctx, id) {
        const diplomaJSON = await ctx.stub.getState(id);
        return diplomaJSON && diplomaJSON.length > 0;
    }

    // GetAllDiplomas returns all diplomas found in the world state.
    async GetAllDiplomas(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all diplomas in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = DiplomaManagement;
