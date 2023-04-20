# Criar projeto node com package.json
    npm init -y

# Instalar dependências
    npm i typescript @types/node tsx tsup -D
<!--o tsup é pra buildar o app-->     

# Criar tsconfig.json
    npx tsc --init

# Lembrar de mudar o target do tsconfig
    "target": "es2020"

# Instalar fastify pra lidar com HTTP
    npm i fastify

# Criado .gitignore
    node_modules
    build
    .env

# Criado script 'dev'
    tsx watch src/server.ts

# Criado script 'build'
    tsup src --out-dir build/

# Criado script 'start'
    node build/server.js

# Criado arquivo '.npmrc'
    save-exact=true
<!--Vai fixar as versões das dependências para não gerar conflitos-->

# Criado arquivo '.env' e '.env.example'
    NODE_ENV=dev

# Instalado 'dotenv'
    npm i dotenv
<!--Serve pra carregar as variáveis de environment-->

# Criado pasta src/env com arquivo 'index.ts'

# Instalado Zod pra validação de dados
    npm i zod

# Instalou e configurou o ESLint mas eu não fiz isso
<!-- >:( -->

# Inicializado o tsc
  tsc --init

# Alterado tsconfig.json pra criar aliases de importação
    "baseUrl": "./",                                  
    "paths": {
      "@/*":["./src/*"]
    },
<!--Com isso, se eu importar qualquer coisa com "@/" ele entende que é pra procurar dentro da pasta src e suas subpastas-->

# Nesse ponto terminamos as configurações básicas do app e podemos partir para as funcionalidades

# Instalado Prisma ORM para lidar com bancos
    npm i prisma -D

# Inicializado o Prisma 
    npx prisma init

# Instalada extensão do Prisma pro VS Code

# Adicionada modificação ao settings.json
    "[prisma]": {
        "editor.formatOnSave": true
    }
<!--Pra formatar arquivos do prisma ao salvar-->

# Após criado o primeiro schema no arquivo 'schema.prisma'...
    npx prisma generate
<!--Isso vai gerar o Client do Prisma através da leitura do schema-->

# Instalado @prisma/client
    npm i @prisma/client

# Criado banco PostgreSQL usando imagem bitnami no docker
    docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432  bitnami/postgresql

# Mudada variável DATABASE_URL do .env para:
    "postgresql://docker:docker@localhost:5432/apisolid?schema=public"
<!--no lugar de 'docker' tava 'johndoe', no lugar de 'apisolid' tava 'mydb'-->

# Criada primeira migration com prisma
    npx prisma migrate dev
<!--ele perguntou o nome da migration, coloquei 'create users'. Lembrar que cada alteração na estrutura do banco exige uma nova migration-->

# Instalada extensão Docker

# Criado arquivo docker-compose.yml

# Criada pasta 'src/lib' com arquivo 'prisma.ts'

# Criada pasta 'src/http' com pasta 'controllers' e arquivo 'register.ts' 

# Criado arquivo 'routes.ts' dentro de src/http

# Instalado bcryptjs
    npm i bcryptjs

# Instalado @types/bcryptjs
    npm i -D @types/bcryptjs´

# Criada pasta 'src/use-cases' com OUTRO arquivo 'register.ts'

# Criada pasta 'src/repositories' com arquivo 'prisma-users-repository.ts'

# Criado 'users-repository.ts' na pasta src/repositories

# Criada pasta 'prisma' dentro de src/repositories

# prisma-users-repository.ts colocado na pasta prisma

# Criada pasta 'errors' em src/use-cases

# Criado arquivo 'user-already-exists-error.ts' na pasta errors

# Instalado vitest e vite-tsconfig-paths
    npm i vitest vite-tsconfig-paths -D
<!--o vite-tsconfig-paths é pro vitest entender as alterações de path que fizemos pra poder importar as coisas usando @-->

# Criado arquivo 'vite.config.ts' na root

# Criados scripts 'test' e 'test:watch' no package.json
    "test" : "vitest run"
    "test:watch" : "vitest"
<!--o segundo é pra ele rodar os testes ao vivo, detectando alterações no código-->

# Criado arquivo de testes 'register.spec.ts' em src/use-cases

# Criada pasta 'in-memory' dentro de repositories

# Criado arquivo 'in-memory-users-repository.ts' dentro de repositories/in-memory

# Adicionado script 'test:coverage' ao package.json
    'vitest run --coverage'
<!--executar esse comando gera uma pasta 'coverage'-->
<!--dentro dela tem um index.html que mostra relatório de testes-->

# Instalado @vitest/coverage-c8
    npm i -D @vitest/coverage-c8
<!--Tive que aumentar a versão do vitest para 0.30.0-->

# Adicionada pasta 'coverage' ao .gitignore

# Instalada UI do vitest
    npm i -D @vitest/ui

# Criado script no package.json pra usar UI do vitest
    "test:ui": "vitest --ui"

# Criado novo caso de uso 'authenticate.ts'

# Criado novo error 'invalid-credentials-error.ts'

# Criado arquivo de testes 'authenticate.spec.ts'

# Criado novo controller 'authenticate.ts'

# Adicionada rota '/sessions' em routes.ts

# Criada subpasta 'factories' em use-cases

# Criado arquivo 'make-register-use-case.ts' em factories

# Criado caso de uso 'get-user-profile.ts' em use-cases

# Criada assinatura de método 'findById' em users-repository.ts

# Implementado método 'findById' em in-memory-users-repository.ts

# Criado novo error 'resource-not-found-error.ts'

# Criado arquivo de teste 'get-user-profile.spec.ts'

# Implementado temporariamente vazio o findByID em prisma-users-repository.ts

# Criado 'check-in.ts' em use-cases

# Criado 'check-ins-repository.ts' em repositories

# Criado 'in-memory-checkins-repository.ts' em repositories/in-memory

# Instalado dayjs
    npm i dayjs

# Criado 'gym-repository.ts' em repositories

# Criado 'in-memory-gym-repository.ts' em repositories/in-memory

# Criada pasta 'utils' em src

# Criado 'get-distance-between-coordinates.ts' em src/utils

# Criado 'create-gym.ts' em use-cases

# Criado arquivo de teste 'create-gym.spec.ts'

# Criado novo error 'max-distance-error.ts'

# Criado novo error 'double-checkin-error.ts'

# Criado novo use case 'fetch-user-checkin-history.ts'

# Criado novo arquivo de teste 'fetch-user-checkin-history.spec.ts'

# Criado novo use case 'get-user-metrics.ts'

# Criado novo arquivo de teste 'get-user-metrics.ts'

# A partir daqui só serão listadas instalações de packages....
==============================================================

# Instalado módulo de JWT do Fastify
    npm i @fastify/jwt

# Criada pasta 'vitest-environment-prisma' em prisma

# Executado 'npm init -y' na pasta criada

# Editado package.json
    "main": "prisma-test-environment.ts"

# Executado 'npm link' na pasta vitest-environment-prisma
<!--para linkar essa pasta e poder instalá-la no projeto-->

# Voltamos pra pasta root e executamos o comando abaixo
    npm link vitest-environment-prisma
<!--lembrando que isso só se aplica pra minha máquina e precisa ser repetido se os testes forem feitos em outra-->

# Instalado npm-run-all pra poder rodar scripts independente de ser ambiente Unix ou Windows
    npm i -D npm-run-all

# Criados mais dois scripts de teste
    "test:create-prisma-environment":"npm link ./prisma/vitest-environment-prisma",
    "test:install-prisma-environment":"npm link vitest-environment-prisma",

# Os scripts acima serão executados em sequência usando:
    "pretest:e2e":"run-s test:create-prisma-environment test:install-prisma-environment",
<!--scripts com 'pre' no nome são executados antes do script normal, nesse caso acima, pretest:e2e será sempre executado antes de test:e2e-->

# Instalado supertest
    npm i supertest -D

# Instalado cookies do fastify
  npm i @fastify/cookies

