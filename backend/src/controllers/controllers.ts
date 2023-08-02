import { Request, Response } from "express";
// import moment from 'moment';
import { Task } from "../database/model";

// moment("12-25-1995", "MM-DD-YYYY");

export const TaskController = {
    create_task: async (req: Request, res: Response):Promise<void> => {

        try{
            const {title, date} = req.body;
            const task = await Task.create({title, date});
            res.status(201).json(task);
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
        console.log("TaskController");
        try{
            const task = await Task.find();
            res.status(200).json(task);
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    update_task: async (req: Request, res: Response):Promise<void> => {
        const update = {
            title: req.body.title,
            date: req.body.date,
            isCompleted: false
        };
        try {
            const updateTask = await Task.findByIdAndUpdate(req.params.id, update);
            if (updateTask) {
                res.status(200).json(updateTask);
            }
        } catch (error) {
            res.status(400).json(error);
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
