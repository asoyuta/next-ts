import { User } from './index'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  id: string
}

type UserData = {
  user: User
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: User[] = await res.json()

  const paths = users.map((user) => {
    return {
      params: { id: user.id.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<UserData, Params> = async (context) => {
  const params = context.params!
  const id = params.id
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user: User = await res.json()

  return {
    props: { user },
  }
}

const Details = ({ user }: UserData) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.website}</p>
      <p>{user.address.city}</p>
    </div>
  )
}

export default Details
