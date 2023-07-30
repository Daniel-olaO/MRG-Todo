import { Request, Response } from "express";
import moment from 'moment';
import { Task } from "../database/model";

moment("12-25-1995", "MM-DD-YYYY");

export const TaskController = {
    create_task: async (req: Request, res: Response):Promise<void> => {
        const today:string = new Date().toLocaleDateString("en-US");

        try{
            const {title, date} = req.body;
            if (moment(date).isSameOrAfter(today)){
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
            res.status(200).json(task);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    update_task: async (req: Request, res: Response):Promise<void> => {
        try {
            const task = await Task.findById(req.params.id);
            if (task){
                const {title, date} = req.body;
                const oldDate:string = task.date.toLocaleTimeString("en-US");

                if (moment(date).isSameOrAfter(oldDate)){
                    const updatedTask = await Task.findByIdAndUpdate(req.params.id,{
                        title,
                        date, 
                        isCompleted: false
                    });
                    res.status(200).json(updatedTask);
                }
                else{
                    res.status(400).json({
                        message: "date must be greater than or equal to current date"
                    });
                }
            }
            else{
                res.status(404).json({message: "task not found"});
            }
        }
        catch(error){
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
