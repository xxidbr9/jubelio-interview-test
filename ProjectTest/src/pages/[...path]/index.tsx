import { GetServerSideProps } from 'next'

type Props = {
  id: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const path = ctx.params?.path || []
  const id = path[path.length - 1]
  return {
    props: {
      id
    }
  }
}



const DetailProductPage = (props: Props) => {
  return (
    <div>Haha
      <pre>
        {JSON.stringify(props.id, null, 2)}
      </pre >
    </div>
  )
}

export default DetailProductPage