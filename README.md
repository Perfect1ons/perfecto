Для Front разработки:

1. Установить зависимости `npm install`
2. Работать в папке src, остальные папки не трогать!
3. Список alias'ов:
   - "@" - путь с папки "src"
   - "@components" - путь с папки "components"
   - "@assets" - путь с папки "assets"
   - "@shared" - путь с папки "shared"
   - "@types" - путь с папки "types"
   - "@img" - путь с папки "img"
   - "@mixins" - доступ к папке sass "mixins.scss"
4. Для работы с mixin'ами в компонентах, подключать таким образом:

   -  @use '@mixins' as mixin;
   -  .class {
   -    @include mixin.mixinName(values)
   -  }
5. Шрифты, (Если автоматически не подключились): 
   - font-family: var(--font-montserrat);
   - font-family: var(--font-inter);
