import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Category } from './entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Todo, Category])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
