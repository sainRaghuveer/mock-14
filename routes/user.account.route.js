const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.account.model');

const router = express.Router();

router.post('/openAccount', async (req, res) => {
    const { name, gender, DOB, email, mobile, initialBalance, adharNo, panNo } = req.body;

    try {
        const userAlready = await userModel.findOne({ email, panNo });
        if (userAlready) {
            res.status(400).send({ message: 'User already exists', "user": userAlready });
        } else {
            const newUser = new userModel({
                name,
                gender,
                DOB,
                email,
                mobile,
                initialBalance,
                adharNo,
                panNo
            });

            newUser.save();
            res.status(200).send({ message: 'User has been saved in data base', "user": newUser });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


router.patch('/updateKYC', async (req, res) => {
    const { id } = req.body;
    const payload=req.body;

    try {
        await userModel.findByIdAndUpdate({_id:id}, payload);
        res.status(200).send({ message: 'User has been updated in data base', "user": payload });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.patch('/depositMoney', async (req, res) => {
    const { amount } = req.body;
    const {email, panNo}=req.body;

    try {
        const userAlready = await userModel.findOne({ email, panNo });
        let {initialBalance} = userAlready;

        initialBalance=initialBalance+amount;
        await userModel.findByIdAndUpdate({_id:userAlready._id}, {initialBalance});

        res.status(200).send({ message: 'Amount is deposited in account', "user": userAlready });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.patch('/withdrawMoney', async (req, res) => {
    const { amount } = req.body;
    const {email, panNo}=req.body;

    try {
        const userAlready = await userModel.findOne({ email, panNo });
        let {initialBalance} = userAlready;

        initialBalance=initialBalance-amount;
        await userModel.findByIdAndUpdate({_id:userAlready._id}, {initialBalance});

        res.status(200).send({ message: 'Amount is Withdraw in account', "user": userAlready });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


router.delete('/closeAccount', async (req, res) => {
    const { id } = req.body;
    console.log(req.body)
    try {
        const user=await userModel.findByIdAndDelete({_id:id});

        res.status(200).send({ message: 'User has been deleted', "user": user });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});



module.exports = {
    router
};