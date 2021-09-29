import styles from '../../styles/Ninjas.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { Data } from '../../types/index.d'

export const getStaticProps: GetStaticProps<Data> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  return {
    props: { users },
  }
}

const Ninjas = ({ users }: Data) => {
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
