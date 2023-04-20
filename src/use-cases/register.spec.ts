import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository //a variable to store the repository
let sut: RegisterUseCase //a variable to store the use case being tested

//here we name the suite of tests
describe('Register User Case', () => {

  //beforeEach runs before each (lol) test
  //this one initializes the values of the two lets above
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository() //instantiating repository
    sut = new RegisterUseCase(usersRepository) //
  })

  //the 'it' keyword detones a specific test
  it('should be able to register', async () => {

    //we call the 'execute' method from register.ts and pass it fictional data
    //it will return the user with a hash of the password
    //we essentially created a new user using the in-memory repository, for testing
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456'
    })

    //we expect the user's id to be a string
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    //creating a new fictional user, just as above
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456'
    })

    //here we use bcrypt's 'compare' method to compare the hash of '123456' to the user's password hash
    //if they match, the password was hashed correctly
    //this function returns a boolean
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    //we expect the boolean to be true, meaning the two hashes are a match
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {

    //the email will be repeated in two registered users
    const email = 'fulano@example.com'
    
    //creating first user
    await sut.execute({
      name: 'Fulano',
      email,
      password: '123456'
    })
    
    //creating second user with same email, to generate a conflict
    await expect(() =>      
      sut.execute({
        name: 'Fulano',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    //we expect it to be rejected
    //the part where we check if email already exists is in the 'execute' method of register.ts

  })
})