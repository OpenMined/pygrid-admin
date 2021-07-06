import {Input, Select, NormalButton} from '@/components'

export function SingleChangeInput<T>({onChange, defaultValue}: {onChange: (e: T) => void; defaultValue: T}) {
  const [datasetName, setName] = useState<string>(currentName)
  const {update} = useDatasets()
  const mutation = update(datasetId, {mutationKey: 'dataset-name'})

  return (
    <>
      <Input
        id="dataset-name"
        label="Dataset name"
        container="w-full"
        placeholder="Insert name"
        value={datasetName}
        onChange={e => setName(e.target.value)}
      />
      <NormalButton
        className="mt-auto w-28"
        onClick={() => mutation.mutate({name: datasetName})}
        disabled={mutation.isLoading}
        isLoading={mutation.isLoading}>
        Change
      </NormalButton>
    </>
  )
}
