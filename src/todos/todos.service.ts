import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>) {};

  async create(createTodoDto:CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async findAll():Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number):Promise<Todo> {
    return await this.todoRepository.findOneBy({id});
  }

  // Update not working yet

  async update(id: number, updateTodoDto: UpdateTodoDto):Promise<Todo> {

    const todo = await this.todoRepository.findOne({
      where: {
        id
      } 
    });
    console.log(todo);
    
    Object.assign(todo, updateTodoDto);

    return await this.todoRepository.save(todo);

    

    // console.log('Preloaded Todo:', todo);

    // if (!todo) {
    //   throw new NotFoundException(`Todo with id ${id} not found.`);
    // }
    
    // return this.todoRepository.save(todo);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
