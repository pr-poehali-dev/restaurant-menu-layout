
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from '@/components/ui/icon';
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  isSpecial?: boolean;
  isVegetarian?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Карпаччо из говядины",
    description: "Тонко нарезанная маринованная говядина с рукколой, пармезаном и трюфельным маслом",
    price: 720,
    image: "https://images.unsplash.com/photo-1648146299011-2def1fe8db45?q=80&w=400&h=300&auto=format&fit=crop",
    category: "starters",
    tags: ["Популярное"],
    isSpecial: true
  },
  {
    id: 2,
    name: "Тартар из тунца",
    description: "Свежий тунец с авокадо, соевым соусом и хрустящими чипсами васаби",
    price: 850,
    image: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?q=80&w=400&h=300&auto=format&fit=crop",
    category: "starters"
  },
  {
    id: 3,
    name: "Цезарь с курицей",
    description: "Классический салат с хрустящими листьями романо, куриной грудкой, соусом цезарь и крутонами",
    price: 580,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400&h=300&auto=format&fit=crop",
    category: "salads"
  },
  {
    id: 4,
    name: "Греческий салат",
    description: "Свежие овощи, оливки, сыр фета и оливковое масло",
    price: 520,
    image: "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=400&h=300&auto=format&fit=crop",
    category: "salads",
    isVegetarian: true
  },
  {
    id: 5,
    name: "Стейк Рибай",
    description: "Мраморная говядина, жаренная на гриле со специями и травами",
    price: 1650,
    image: "https://images.unsplash.com/photo-1601356616077-695728ae17cb?q=80&w=400&h=300&auto=format&fit=crop",
    category: "mains",
    tags: ["Рекомендуем"],
    isSpecial: true
  },
  {
    id: 6,
    name: "Паста Карбонара",
    description: "Классическая паста с гуанчиале, яйцом и пармезаном",
    price: 590,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&h=300&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: 7,
    name: "Тирамису",
    description: "Классический итальянский десерт с маскарпоне, кофейным сиропом и какао",
    price: 420,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&h=300&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: 8,
    name: "Чизкейк",
    description: "Нежный сливочный чизкейк с ягодным соусом",
    price: 450,
    image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?q=80&w=400&h=300&auto=format&fit=crop",
    category: "desserts"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories = [
    { id: "starters", name: "Закуски" },
    { id: "salads", name: "Салаты" },
    { id: "mains", name: "Основные блюда" },
    { id: "desserts", name: "Десерты" }
  ];

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2FCE2]/20">
      <header className="bg-[#1A1F2C] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-semibold font-['Cormorant']">Ресторан "Вкусный мир"</h1>
            <div className="hidden md:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={18} />
                <span className="font-['Montserrat']">10:00 - 22:00</span>
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Phone" size={18} />
                <span className="font-['Montserrat']">+7 (999) 123-45-67</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <div className="mb-6 relative">
              <Input
                type="text"
                placeholder="Поиск блюд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 font-['Montserrat']"
              />
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {selectedDish ? (
              <div className="mb-6">
                <button 
                  onClick={() => setSelectedDish(null)}
                  className="flex items-center text-[#1A1F2C] mb-4 hover:underline font-['Montserrat']"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-1" />
                  Назад к меню
                </button>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={selectedDish.image} 
                        alt={selectedDish.name} 
                        className="w-full h-64 md:h-96 object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl md:text-3xl font-semibold font-['Cormorant']">{selectedDish.name}</h2>
                        <div className="flex items-center gap-2">
                          {selectedDish.isVegetarian && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Вегетарианское</Badge>
                          )}
                          {selectedDish.isSpecial && (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Особое блюдо</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6 font-['Montserrat']">{selectedDish.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-semibold text-[#1A1F2C] font-['Montserrat']">{selectedDish.price} ₽</span>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2 font-['Cormorant']">Состав блюда</h3>
                        <p className="text-gray-600 font-['Montserrat']">Подробная информация о составе блюда и аллергенах будет доступна по запросу у официанта.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Tabs defaultValue={categories[0].id}>
                <TabsList className="mb-4 bg-white">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="font-['Montserrat']"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredItems
                        .filter(item => item.category === category.id)
                        .map(item => (
                          <Card 
                            key={item.id} 
                            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedDish(item)}
                          >
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              />
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="font-['Cormorant']">{item.name}</CardTitle>
                                <span className="font-semibold text-[#1A1F2C] font-['Montserrat']">{item.price} ₽</span>
                              </div>
                              {(item.tags && item.tags.length > 0) && (
                                <div className="flex gap-2 mt-1">
                                  {item.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="bg-[#D3E4FD] border-none text-[#1A1F2C]">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {item.isVegetarian && (
                                    <Badge variant="outline" className="bg-green-100 border-none text-green-800">
                                      <Icon name="Leaf" size={12} className="mr-1" />
                                      Вегетарианское
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="line-clamp-2 font-['Montserrat']">
                                {item.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>

          <div className="md:w-1/4 bg-white rounded-lg shadow p-4 h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4 font-['Cormorant']">Специальные предложения</h2>
            <div className="space-y-4">
              {menuItems
                .filter(item => item.isSpecial)
                .map(item => (
                  <div 
                    key={item.id} 
                    className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => setSelectedDish(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium font-['Montserrat']">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1 font-['Montserrat']">{item.description}</p>
                      <p className="text-[#1A1F2C] font-semibold font-['Montserrat']">{item.price} ₽</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <h2 className="text-xl font-semibold mb-2 font-['Cormorant']">Информация</h2>
              <p className="text-sm text-gray-600 mb-4 font-['Montserrat']">
                Все цены указаны в рублях. Обслуживание зала не включено в счет.
              </p>
              <div className="flex flex-col space-y-2 text-sm font-['Montserrat']">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Вс: 10:00 - 22:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Ресторанная, 42</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1A1F2C] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 font-['Cormorant']">Ресторан "Вкусный мир"</h2>
              <p className="text-gray-300 font-['Montserrat']">Вкус, который запомнится надолго</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 font-['Montserrat']">Мы в соцсетях</h3>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-[#D3E4FD]">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#D3E4FD]">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#D3E4FD]">
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
            <div className="font-['Montserrat']">
              <h3 className="font-semibold mb-2">Контакты</h3>
              <p>ул. Ресторанная, 42</p>
              <p>+7 (999) 123-45-67</p>
              <p>info@vkusnymir.ru</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center font-['Montserrat']">
            <p className="text-gray-400">© 2025 Ресторан "Вкусный мир". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
