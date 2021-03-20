# Weather forecast
---
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run b
```
---
### Second Version 

Я нашёл [сайт](https://geolocation-db.com/ "https://geolocation-db.com/"), API которого возвращает объект, одно значение которого является город пользователя.Учитывая плюсы и минусы, мне больше нравится использование API этого сайта, чем нативную геолокацию. Думаю вам стоит рассмотреть этот вариант моего проекта. 

Плюсы
> 1. Не нужно отправлять какие-либо данные, API собирает данные для ответа по IP-адрессу пользователя, который сделал запрос.
> 2. Пользователь всегда имеет IP-адресс, обрабатывать запасные варианты не нужно.
> 3. Благодаря этому я могу избавить себя от "костылей", и сразу использовать [API погоды](https://openweathermap.org/current "https://openweathermap.org/current") by city name.

Минусы
> 1. IP-адресс легко изменить, например, с помощью VPN. Такая ситуация не редкая, по этому часть пользователей при входе будет видеть город IP-адресс которого изменен с помощью VPN(Остаеться разве что делать подсказку про VPN при входе).
> 2. [Сайт](https://geolocation-db.com/ "https://geolocation-db.com/") который я нашёл, имеет малую известность(я даже не смог узнать кто его создал), и о какой-либо поддержке этого сервиса сложно говорить, не исключенно что сайт просто перестанет существовать.

Код этого варианта я оставил в ветке "secondVersion" 
```
git checkout secondVersion
```
---
![Weather_ts](https://github.com/deniska-sosiska/Weather_ts/blob/main/src/assets/example.png)