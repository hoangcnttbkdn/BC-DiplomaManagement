const { StatusCodes } = require('http-status-codes');
const { plainToInstance } = require('class-transformer');
const { ILike } = require('typeorm');

const { diplomaRepository } = require('../database/repositories');
const { dataSource } = require('../configs/connect-database');
const { Diploma } = require('../database/models/diploma');
const { connectBC } = require('../utils/blockchain');
const {
  convertJson,
  convertDiplomaType,
  convertResult,
} = require('../utils/convert-result');

const diplomaController = {
  syncData: async (req, res) => {
    try {
      const { contract } = await connectBC();
      let result = await contract.evaluateTransaction('GetAllDiplomas');
      result = convertJson(result);
      const data = convertResult(result);
      await diplomaRepository.clear();
      await diplomaRepository.save(data);
      res
        .status(StatusCodes.OK)
        .json({ message: 'Sync data from chaincode to database success!' });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  getDiplomas: async (req, res) => {
    try {
      const { name, code } = req.query;
      const { contract } = await connectBC();
      if (name) {
        const response = [];
        const diplomas = await diplomaRepository.find({
          where: { fullName: ILike(`%${name}%`) },
        });
        for (const item of diplomas) {
          const result = await contract.evaluateTransaction(
            'ReadDiploma',
            item.code
          );
          response.push(convertJson(result));
        }
        res.status(StatusCodes.OK).json(convertResult(response));
      } else if (code) {
        const response = [];
        const diploma = await diplomaRepository.findOne({ where: { code } });
        if (diploma) {
          const result = await contract.evaluateTransaction(
            'ReadDiploma',
            code
          );
          response.push(convertDiplomaType(convertJson(result)));
        }
        res.status(StatusCodes.OK).json(response);
      } else {
        const result = await contract.evaluateTransaction('GetAllDiplomas');
        res.status(StatusCodes.OK).json(convertResult(convertJson(result)));
      }
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  getDiplomaByCode: async (req, res) => {
    try {
      const { code } = req.params;
      const { contract } = await connectBC();
      const result = await contract.evaluateTransaction('ReadDiploma', code);
      res.status(StatusCodes.OK).json(convertDiplomaType(convertJson(result)));
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  createDiploma: async (req, res) => {
    const queryRunner = dataSource.createQueryRunner();
    queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = req.body;
      console.log(data);
      const { contract } = await connectBC();
      await contract.submitTransaction(
        'CreateDiploma',
        data.code,
        data.fullName,
        data.dateOfBirth,
        data.gender,
        data.certificate,
        data.speciality,
        data.graduationYear,
        data.school,
        data.rank,
        data.modeOfStudy,
        data.regNo,
        data.urlImage,
        data.status
      );
      data.status = data.status === 'true';
      await queryRunner.manager.save(plainToInstance(Diploma, data));
      await queryRunner.commitTransaction();
      res.status(StatusCodes.OK).json({ message: 'Create diploma success!' });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    } finally {
      await queryRunner.release();
    }
  },
  updateDiploma: async (req, res) => {
    try {
      const { code } = req.params;
      const data = req.body;
      const { contract } = await connectBC();
      await contract.submitTransaction(
        'UpdateDiploma',
        code,
        data.fullName,
        data.dateOfBirth,
        data.gender,
        data.certificate,
        data.speciality,
        data.graduationYear,
        data.school,
        data.rank,
        data.modeOfStudy,
        data.regNo,
        data.urlImage,
        data.status.toString()
      );
      await diplomaRepository
        .createQueryBuilder()
        .update()
        .set({ ...data })
        .where('code = :code')
        .setParameters({ code })
        .execute();
      res.status(StatusCodes.OK).json({ message: 'Update diploma success!' });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  deleteDiploma: async (req, res) => {
    try {
      const { code } = req.params;
      const { contract } = await connectBC();
      await contract.submitTransaction('DeleteDiploma', code);
      await diplomaRepository
        .createQueryBuilder()
        .delete()
        .where('code = :code')
        .setParameters({ code })
        .execute();
      res.status(StatusCodes.OK).json({ message: 'Delete diploma success!' });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

module.exports = { diplomaController };
