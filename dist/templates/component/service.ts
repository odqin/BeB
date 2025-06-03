import { Document, Model } from 'mongoose';

export interface IService<T> {
    create(item: T): Promise<T & Document>;
    findById(id: string): Promise<(T & Document) | null>;
    update(id: string, item: Partial<T>): Promise<(T & Document) | null>;
    delete(id: string): Promise<boolean>;
}

export class Service<T> implements IService<T> {
    private model: Model<T & Document>;

    constructor(model: Model<T & Document>) {
        this.model = model;
    }

    async create(item: T): Promise<T & Document> {
        const newItem = new this.model(item as any);
        return await newItem.save();
    }

    async findById(id: string): Promise<(T & Document) | null> {
        return await this.model.findById(id).exec();
    }

    async update(id: string, item: Partial<T>): Promise<(T & Document) | null> {
        return await this.model.findByIdAndUpdate(
            id,
            item as import('mongoose').UpdateQuery<T & Document>,
            { new: true }
        ).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}