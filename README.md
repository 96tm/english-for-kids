1. Task
   https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/english-for-kids.md#english-for-kids
2. Screenshot
   ![Screenshot from 2021-07-19 20-19-37](https://user-images.githubusercontent.com/2994043/126200728-c57118a5-956d-4154-934f-2770c3fcf287.png)
3. Deployment
   https://rolling-scopes-school.github.io/96tm-JSFE2021Q1/english-for-kids/
   (server address: https://warm-basin-33080.herokuapp.com
   server source: https://github.com/rolling-scopes-school/96tm-JSFE2021Q1/tree/english-for-kids-server)
4. Done
   19.07.21
5. Self-check
   385-50=335

## Не выполнено

    -40 - используются redux или rxjs
    -10 - присутствует swagger с возможностью делать запросы к api.

## Вёрстка, дизайн, UI главной страницы приложения:

    +10 - присутствуют все указанные в задании элементы как на мобильной, так и на десктопной версии
    +10 - выполнены все описанные требования к оформлению приложения

## Вёрстка, дизайн, UI страницы категории и слова:

    +10 - выполнены все описанные требования к оформлению приложения

    +20 - Реализован механизм авторизации со стороны frontend части, приложение разделено на публичную и приватную часть, доступную только авторизованным пользователям:

    +15 - Реализован infinite scroll для категорий
    +15 - Реализован infinite scroll для слов

## Backend часть

    +15 - реализованна возможность выполнять Create Read Update Delete (CRUD) операций для сущности Word category
    +15 - реализованна возможность выполнять CRUD операций для сущности Word
    +15 - реализованна возможность авторизации на админ страницу.

## Advanced scope

    +20 - присутствует возможность прослушивать прикрепленные аудио файлы в карточке слова.
    +20 - реализован механизм вложенного роутинга, для админ панели.
    +20 - реализован механизм "гвардов" не допускающих доступ к приватному апи без авторизации.
    +20 - реализован механизм "перехватчиков" которые отслеживают ошибки авторизации редиректят пользователя на главную страницу, в случае если он не прошел авторизацию.

## Mentor

    +20 - Данные хранятся в базе данных.
    +20 - дублирование кода сведено к минимуму, не используются магические числа, используются осмысленные имена переменных и функций, оптимальный размер функций и т.д.
    +20 - подключены и используются webpack(для frontend части), eslint, eslint-config-airbnb-base
    +20 - приложение разбито на отдельные модули
    +20 - используются фичи ES6 и выше
