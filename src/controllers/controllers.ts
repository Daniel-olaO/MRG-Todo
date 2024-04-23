import { Request, Response } from "express";
import { Task } from "../database/model";



export const TaskController = {
    create_task: async (req: Request, res: Response) => {
        try{
            const {title, date} = req.body;
            const task = await Task.create({title, date});
            res.status(201).json({task});
        }
        catch(error){
            res.status(500).json({error});
        }
    },
    get_task: async (req: Request, res: Response) => {
        try{
            const task = await Task.find();
            res.status(200).json({task});
        }
        catch(error){
            res.status(500).json({error});
        }
    },
    update_task: async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.params.id);
            if (task){
                const {title, time} = req.body;
                const updatedTask = await Task.findByIdAndUpdate(req.params.id, {title, time});
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
            const task = await Task.findByIdAndUpdate(req.params.id, update);
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
            const task = await Task.findByIdAndDelete(req.params.id);
            res.status(204).end(task);
        }
        catch(error) {
            res.status(400).json({error});
        }
    }
}
