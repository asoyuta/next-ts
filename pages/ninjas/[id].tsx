import { User } from '../../types/index.d'
import { GetStaticPaths, GetStaticProps } from 'next'

type UserData = {
  user: User
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: User[] = await res.json()

  const paths = users.map((user) => `/ninjas/${user.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<UserData> = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params!.id}`)
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
