import styles from '../../styles/Ninjas.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type UsersData = {
  users: User[]
}

export const getStaticProps: GetStaticProps<UsersData> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  return {
    props: { users },
  }
}

const Ninjas = ({ users }: UsersData) => {
  return (
    <div>
      <h1>All Ninjas</h1>
      {users.map((user) => (
        <Link href={`/ninjas/${user.id}`} key={user.id}>
          <a className={styles.single}>
            <h3>{user.name}</h3>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Ninjas
