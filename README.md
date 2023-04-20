# App

GymPass style app.

## RFs (Requisitos funcionais)

-[x] cadastrar usuário;
-[x] autenticar usuário;
-[x] obter o perfil de usuário logado;
-[x] obter número de check-ins realizados pelo usuário logado;
-[x] obter histórico de check-ins do usuário;
-[x] buscar academias próximas (até 10km);
-[x] buscar academias pelo nome;
-[x] realizar check-in em academia;
-[x] validar check-in de usuário;
-[x] cadastrar academia;

## RNs (Regras de Negócio)

-[x] usuário não pode se cadastrar com e-mail duplicado;
-[x] usuário não pode fazer 2 check-ins no mesmo dia;
-[x] usuário não pode fazer check-in a mais de 100m da academia;
-[x] o check-in só é validado até 20mins após criado;
-[x] o check-in só pode ser validado por admins;
-[x] a academia só pode ser cadastrada por admins;

## RNFs (Requisitos não-funcionais)

-[x] a senha do usuário deve ser criptografada;
-[x] dados da aplicação precisam estar em um banco PostgreSQL;
-[x] listas de dados precisam estar paginadas com 20 itens por página;
-[x] o usuário deve ser identificado por um JWT (JSON Web Token);