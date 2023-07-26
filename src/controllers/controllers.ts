import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel, TaskModel } from "../database/model";


export const User = {
    register_user: async (req: Request, res: Response) => {
        try{
            const {username, password, email} = req.body;
            const user = await UserModel.create({username, password, email});
            res.status(201).json({user});
        }
        catch(error){
            res.status(500).json({error});
        }
    },
    check_user: async (req: Request, res: Response) => {
        try {
            const {username, password} = req.body;
            const result = await UserModel.findOne({username: username});

            if (result){
                const isPasswordValid = await bcrypt.compare(password, result.authentication.password);

                if (isPasswordValid){
                    res.status(200).json({message: "login successful"});
                }
            }
            else{
                res.status(404).json({message: "user not found"});
            }
        }
        catch(error){
            res.status(500).json({error});
        }
    },
}

export const Task = {
    create_task: async (req: Request, res: Response) => {
        try{
            const {title, time} = req.body;
            const task = await TaskModel.create({title, time});
            res.status(201).json({task});
        }
        catch(error){
            res.status(500).json({error});
        }
    },
    get_task: async (req: Request, res: Response) => {
        try{
            const task = await TaskModel.find({username: req.params.username});
            res.status(200).json({task});
        }
        catch(error){
            res.status(500).json({error});
        }
    },
    update_task: async (req: Request, res: Response) => {
        try {
            const task = await TaskModel.findById(req.params.id);
            if (task){
                const {title, time} = req.body;
                const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, {title, time});
                res.status(200).json({updatedTask});
            }
            else{
                res.status(404).json({message: "task not found"});
            }
        }
        catch(error){
            res.status(404).json({message: "task not found"});
        }
    },
    complete_task:async (req: Request, res: Response) => {
        const update = {isCompleted: true};
        try {
            const task = await TaskModel.findByIdAndUpdate(req.params.id, update);
            if (task) {
                res.status(200).json(task);
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    },
    delete_task:async (req: Request, res: Response) => {
        try{
            const task = await TaskModel.findByIdAndDelete(req.params.id);
            res.status(200).end(task);
        }
        catch(error) {
            res.status(400).json({error});
        }
    }
}
