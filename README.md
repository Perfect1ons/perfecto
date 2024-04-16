Для Front разработки:

1. Установить зависимости `npm install`
2. Работать в папке src, остальные папки не трогать!
3. Список alias'ов:
   - "@" - путь с папки "src"
   - "@components" - путь с папки "components"
   - "@assets" - путь с папки "assets"
   - "@pages" - путь с папки "pages"
   - "@shared" - путь с папки "shared"
   - "@interfaces" - путь с папки "interfaces"
   - "@img" - путь с папки "img"
   - "@routes" - путь с папки "routes"
   - "@hooks" - путь с папки "hooks"
   - "@mixins" - доступ к папке sass "mixins.scss"
4. Для работы с mixin'ами в компонентах, подключать таким образом:

   -  @use '@mixins' as mixin;
   -  .class {
   -    @include mixin.mixinName(values)
   -  }