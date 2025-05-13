
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Icon from '@/components/ui/icon';
import { Separator } from "@/components/ui/separator";

// Моделирование данных из базы, в реальном приложении это будет запрос к API
interface Ingredient {
  id: number;
  name: string;
  calories: number;
  allergen: boolean;
  unit: string;
  price_per_unit: number;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  active: boolean;
}

interface Dish {
  id: number;
  name: string;
  description: string;
  recipe: string;
  preparation_time: number;
  cooking_time: number;
  difficulty_level: string;
  price: number;
  cost: number;
  active: boolean;
  category_id: number;
  image_url: string;
  rating: number;
  popularity: number;
}

interface DishIngredient {
  id: number;
  dish_id: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
  notes: string;
  ingredient?: Ingredient;
}

const mockCategories: Category[] = [
  { id: 1, name: 'Закуски', description: 'Легкие закуски и холодные блюда', image_url: 'appetizers.jpg', active: true },
  { id: 2, name: 'Основные блюда', description: 'Горячие основные блюда', image_url: 'main_courses.jpg', active: true },
  { id: 3, name: 'Десерты', description: 'Сладкие блюда и выпечка', image_url: 'desserts.jpg', active: true },
  { id: 4, name: 'Напитки', description: 'Алкогольные и безалкогольные напитки', image_url: 'drinks.jpg', active: true },
  { id: 5, name: 'Салаты', description: 'Овощные и мясные салаты', image_url: 'salads.jpg', active: true },
  { id: 9, name: 'Супы', description: 'Горячие и холодные супы', image_url: 'soups.jpg', active: true },
];

const mockIngredients: Ingredient[] = [
  { id: 1, name: 'Мука пшеничная', calories: 364, allergen: false, unit: 'гр', price_per_unit: 0.05, description: 'Мука высшего сорта' },
  { id: 4, name: 'Яйца куриные', calories: 155, allergen: true, unit: 'шт', price_per_unit: 1.20, description: 'Яйца категории C0' },
  { id: 6, name: 'Филе куриное', calories: 165, allergen: false, unit: 'гр', price_per_unit: 3.50, description: 'Филе грудки без кожи' },
  { id: 15, name: 'Спагетти', calories: 158, allergen: false, unit: 'гр', price_per_unit: 0.30, description: 'Спагетти из твердых сортов' },
  { id: 19, name: 'Масло оливковое', calories: 884, allergen: false, unit: 'мл', price_per_unit: 2.00, description: 'Оливковое масло extra virgin' },
  { id: 20, name: 'Перец черный молотый', calories: 251, allergen: false, unit: 'гр', price_per_unit: 0.50, description: 'Перец свежемолотый' },
  { id: 22, name: 'Сыр пармезан', calories: 402, allergen: true, unit: 'гр', price_per_unit: 8.00, description: 'Пармезан 36 месяцев' },
];

const mockDishes: Dish[] = [
  { 
    id: 1, 
    name: 'Паста Карбонара', 
    description: 'Классическая итальянская паста с беконом и сыром.', 
    recipe: 'Отварить пасту аль денте. Обжарить бекон. Смешать яйца, пармезан. Соединить все ингредиенты.', 
    preparation_time: 15, 
    cooking_time: 12, 
    difficulty_level: 'easy', 
    price: 12.50, 
    cost: 5.75, 
    active: true, 
    category_id: 2, 
    image_url: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?q=80&w=400&auto=format&fit=crop', 
    rating: 4.8, 
    popularity: 95 
  },
  { 
    id: 2, 
    name: 'Салат Цезарь', 
    description: 'Салат с курицей, листьями романо, пармезаном и соусом Цезарь.', 
    recipe: 'Обжарить куриное филе. Приготовить соус. Смешать все ингредиенты.', 
    preparation_time: 20, 
    cooking_time: 0, 
    difficulty_level: 'easy', 
    price: 10.00, 
    cost: 4.50, 
    active: true, 
    category_id: 5, 
    image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400&auto=format&fit=crop', 
    rating: 4.5, 
    popularity: 85 
  },
  { 
    id: 5, 
    name: 'Суп Минестроне', 
    description: 'Традиционный итальянский овощной суп.', 
    recipe: 'Обжарить лук и чеснок. Добавить овощи и томатную пасту. Варить 30 минут.', 
    preparation_time: 20, 
    cooking_time: 30, 
    difficulty_level: 'easy', 
    price: 7.00, 
    cost: 3.20, 
    active: true, 
    category_id: 9, 
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&auto=format&fit=crop', 
    rating: 4.3, 
    popularity: 70 
  },
  { 
    id: 7, 
    name: 'Тирамису', 
    description: 'Итальянский десерт с кофе и маскарпоне.', 
    recipe: 'Смешать яйца с сахаром. Добавить маскарпоне. Пропитать печенье кофе. Собрать слоями.', 
    preparation_time: 30, 
    cooking_time: 0, 
    difficulty_level: 'medium', 
    price: 6.50, 
    cost: 3.00, 
    active: true, 
    category_id: 3, 
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&auto=format&fit=crop', 
    rating: 4.9, 
    popularity: 90 
  },
];

const mockDishIngredients: DishIngredient[] = [
  { id: 1, dish_id: 1, ingredient_id: 15, quantity: 200, unit: 'гр', notes: 'Спагетти' },
  { id: 2, dish_id: 1, ingredient_id: 22, quantity: 100, unit: 'гр', notes: 'Пармезан' },
  { id: 3, dish_id: 1, ingredient_id: 4, quantity: 2, unit: 'шт', notes: 'Яйца' },
  { id: 4, dish_id: 1, ingredient_id: 19, quantity: 30, unit: 'мл', notes: 'Оливковое масло' },
  { id: 5, dish_id: 1, ingredient_id: 20, quantity: 5, unit: 'гр', notes: 'Перец черный' },
  { id: 6, dish_id: 2, ingredient_id: 6, quantity: 150, unit: 'гр', notes: 'Куриное филе гриль' },
  { id: 7, dish_id: 2, ingredient_id: 22, quantity: 50, unit: 'гр', notes: 'Пармезан' },
];

const AdminMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState<Dish[]>(mockDishes);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [dishIngredients, setDishIngredients] = useState<DishIngredient[]>(mockDishIngredients);
  
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Дополняем ингредиенты блюда полными данными об ингредиентах
  const getDishIngredientsWithDetails = (dishId: number) => {
    return dishIngredients
      .filter(di => di.dish_id === dishId)
      .map(di => ({
        ...di,
        ingredient: ingredients.find(ing => ing.id === di.ingredient_id)
      }));
  };

  // Рассчитываем стоимость блюда на основе ингредиентов
  const calculateDishCost = (dishId: number) => {
    const dishIngs = getDishIngredientsWithDetails(dishId);
    return dishIngs.reduce((total, di) => {
      const ingredient = di.ingredient;
      if (ingredient) {
        return total + (di.quantity * ingredient.price_per_unit);
      }
      return total;
    }, 0);
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Не указано';
  };
  
  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryName(dish.category_id).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditDish = (dish: Dish) => {
    setSelectedDish(dish);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDish = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDish) {
      setDishes(dishes.filter(d => d.id !== selectedDish.id));
      setIsDeleteDialogOpen(false);
      setSelectedDish(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#1A1F2C] text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Панель администратора ресторана</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Icon name="User" size={18} />
                <span>Алексей Иванов</span>
              </span>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#1A1F2C]">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-[#1A1F2C]">Управление меню</h2>
          <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить блюдо
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Всего блюд</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{dishes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Категории</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ингредиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{ingredients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Средняя цена</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {formatPrice(dishes.reduce((avg, dish) => avg + dish.price, 0) / dishes.length)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Меню ресторана</CardTitle>
            <CardDescription>Управление блюдами, ценами и ингредиентами</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dishes" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="dishes">Блюда</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
                <TabsTrigger value="ingredients">Ингредиенты</TabsTrigger>
              </TabsList>

              <TabsContent value="dishes">
                <div className="mb-4 relative">
                  <Input
                    type="text"
                    placeholder="Поиск блюд..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="overflow-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Себестоимость</TableHead>
                        <TableHead>Маржа</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDishes.map((dish) => {
                        const dishCost = calculateDishCost(dish.id);
                        const margin = dish.price - dishCost;
                        const marginPercent = (margin / dish.price) * 100;
                        
                        return (
                          <TableRow key={dish.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden">
                                  <img src={dish.image_url} alt={dish.name} className="h-full w-full object-cover" />
                                </div>
                                {dish.name}
                              </div>
                            </TableCell>
                            <TableCell>{getCategoryName(dish.category_id)}</TableCell>
                            <TableCell>{formatPrice(dish.price)}</TableCell>
                            <TableCell>{formatPrice(dishCost)}</TableCell>
                            <TableCell>
                              <Badge className={`${marginPercent >= 50 ? 'bg-green-100 text-green-800' : 
                                marginPercent >= 30 ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                                {marginPercent.toFixed(0)}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={dish.active ? "default" : "outline"}>
                                {dish.active ? 'Активно' : 'Неактивно'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="MoreVertical" size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditDish(dish)}>
                                    <Icon name="Edit" size={14} className="mr-2" />
                                    Редактировать
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteDish(dish)}>
                                    <Icon name="Trash" size={14} className="mr-2" />
                                    Удалить
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Icon name="Eye" size={14} className="mr-2" />
                                    Просмотр
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="overflow-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead>Изображение</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.description}</TableCell>
                          <TableCell>
                            <div className="h-10 w-10 rounded-md overflow-hidden">
                              <img src={`https://source.unsplash.com/random/100x100/?${category.name}`} alt={category.name} className="h-full w-full object-cover" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={category.active ? "default" : "outline"}>
                              {category.active ? 'Активно' : 'Неактивно'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="ingredients">
                <div className="overflow-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Калории</TableHead>
                        <TableHead>Аллерген</TableHead>
                        <TableHead>Единица</TableHead>
                        <TableHead>Цена за ед.</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                          <TableCell className="font-medium">{ingredient.name}</TableCell>
                          <TableCell>{ingredient.calories} ккал</TableCell>
                          <TableCell>
                            {ingredient.allergen && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-none">
                                Аллерген
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{ingredient.unit}</TableCell>
                          <TableCell>{formatPrice(ingredient.price_per_unit)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Диалог редактирования блюда */}
      {selectedDish && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Редактирование блюда</DialogTitle>
              <DialogDescription>
                Внесите изменения в данные о блюде и его составе
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="name">Название блюда</Label>
                  <Input id="name" defaultValue={selectedDish.name} />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" defaultValue={selectedDish.description} />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="category">Категория</Label>
                  <Select defaultValue={selectedDish.category_id.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="price">Цена, ₽</Label>
                    <Input id="price" type="number" defaultValue={selectedDish.price} />
                  </div>
                  <div>
                    <Label htmlFor="cost">Себестоимость, ₽</Label>
                    <Input id="cost" type="number" defaultValue={calculateDishCost(selectedDish.id)} readOnly />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="prep_time">Время подготовки, мин</Label>
                    <Input id="prep_time" type="number" defaultValue={selectedDish.preparation_time} />
                  </div>
                  <div>
                    <Label htmlFor="cook_time">Время приготовления, мин</Label>
                    <Input id="cook_time" type="number" defaultValue={selectedDish.cooking_time} />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="difficulty">Сложность</Label>
                  <Select defaultValue={selectedDish.difficulty_level}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Лёгкое</SelectItem>
                      <SelectItem value="medium">Среднее</SelectItem>
                      <SelectItem value="hard">Сложное</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label>Изображение блюда</Label>
                  <div className="mt-2 border rounded-md overflow-hidden h-48">
                    <img 
                      src={selectedDish.image_url} 
                      alt={selectedDish.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="mt-2 w-full">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Изменить изображение
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Ингредиенты</Label>
                    <Button variant="outline" size="sm">
                      <Icon name="Plus" size={14} className="mr-1" />
                      Добавить
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto p-1">
                    {getDishIngredientsWithDetails(selectedDish.id).map((di) => (
                      <div key={di.id} className="flex items-center justify-between border rounded-md p-3">
                        <div>
                          <div className="font-medium">{di.ingredient?.name}</div>
                          <div className="text-sm text-gray-500">{di.quantity} {di.unit}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Icon name="Trash" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="recipe">Рецепт приготовления</Label>
                  <Textarea id="recipe" className="h-24" defaultValue={selectedDish.recipe} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Сохранить изменения</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Диалог удаления блюда */}
      {selectedDish && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление блюда</DialogTitle>
              <DialogDescription>
                Вы уверены, что хотите удалить блюдо "{selectedDish.name}"? Это действие нельзя будет отменить.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
              <Button variant="destructive" onClick={confirmDelete}>Удалить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminMenu;
