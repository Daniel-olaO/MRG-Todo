import { Request, Response } from "express";
// import moment from 'moment';
import { Task } from "../database/model";

// moment("12-25-1995", "MM-DD-YYYY");

export const TaskController = {
    create_task: async (req: Request, res: Response):Promise<void> => {
        // const today:string = new Date().toLocaleDateString("en-US");

        try{
            const {title, date} = req.body;
            // eslint-disable-next-line no-constant-condition
            if (true){
                const task = await Task.create({title, date});
                res.status(201).json(task);
            }
            else{
                res.status(400).json({
                    message: "date must be greater than or equal to current date"
                });
            }
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    get_task: async (req: Request, res: Response):Promise<void> => {
        try{
            const task = await Task.findById(req.params._id);
            res.status(200).json(task);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    get_all_tasks: async (req: Request, res: Response):Promise<void> => {
        try{
            const task = await Task.find();
            // console.log(task);
            res.status(200).json(task);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    update_task: async (req: Request, res: Response):Promise<void> => {
         try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body);
            if (task) {
                res.status(200).json(task);
            }
        }
        catch(error){
            console.log("task not found");
            res.status(404).json({message: "task not found"});
        }
    },
    complete_task:async (req: Request, res: Response):Promise<void> => {
        const update = {isCompleted: true};
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, update);
            if (task) {  
                res.status(200).json(task);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    delete_task:async (req: Request, res: Response):Promise<void> => {
        try{
            const task = await Task.findByIdAndDelete(req.params._id);
            res.status(204).send(task);
        }
        catch(error) {
            res.status(400).json(error);
        }
    }
}
