import { Category } from '../../domain/enterprise/entities/category.entity';

export function makeDrinkCategory() {
  const category = new Category();
  category.id = 3;
  category.name = 'Bebida';
  return category;
}

export function makeSnackCategory() {
  const category = new Category();
  category.id = 1;
  category.name = 'Lanche';
  return category;
}

export function makeDessertCategory() {
  const category = new Category();
  category.id = 4;
  category.name = 'Sobremesa';
  return category;
}

export function makeFollowUpCategory() {
  const category = new Category();
  category.id = 2;
  category.name = 'Acompanhamento';
  return category;
}
