# Layout

Follows the layout suggested here [https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises)

```bash
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
...
```

# Part 3

## Exercise 3.10 phonebook backend step10

### Setup Process

```bash
# run from root of repository
heroku create
# push the part3/phonebook subdirectory only
git subtree push --prefix part3/phonebook heroku master
```

### Live Application

You can access the app here: (whispering-brushlands-36634)[https://whispering-brushlands-36634.herokuapp.com/]

## Exercise 3.11 phonebook full stack

### Setup Process

```bash
# pre-step: create another heroku project... via gui or whatever
# rename the remote that is created... we need multiple remotes when working with this monorepo...
git remote rename heroku heroku-backend
# add the new remote for the front-end
git remote add heroku-frontend https://git.heroku.com/whispering-fortress-34473.git

# push the part3/phonebook subdirectory only
git subtree push --prefix part3/phonebook-frontend heroku-frontend master
```

### Live Application

You can access the app here: (whispering-fortress-34473)[https://whispering-fortress-34473.herokuapp.com/]
