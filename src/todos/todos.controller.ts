import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll():Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Todo> {
    const  result = await this.todosService.findOne(id)
  
    return result;
  }

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto):Promise<Todo> {
  //    return await this.todosService.update(id, updateTodoDto)
  // }

  //Updated Todo Controller method
  @Put('id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto)
  }


  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(+id);
  }
}
