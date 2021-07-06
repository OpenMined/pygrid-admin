import {useForm} from 'react-hook-form'
import {Input, ActionButton, ClosePanelButton, MutationError} from '@/components'
import {Spinner} from '@/components/icons/spinner'
import {useDatasets} from '@/lib/data/useMe'
import {DatasetRequirementsList} from '@/components/pages/datasets/DatasetRequirementsList'
import {FileDetails} from '@/components/pages/datasets/FileDetails'
import {ErrorMessage} from '@/utils/api-axios'

export function DatasetCreatePanel({onClose}: {onClose: () => void}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors, isValid}
  } = useForm({mode: 'onTouched'})

  const {create} = useDatasets()

  const mutation = create(
    {
      onSuccess: () => {
        reset()
        onClose()
      }
    },
    {headers: {'Content-Type': 'multipart/form-data'}}
  )

  const onSubmit = ({file}: {file: File}) => {
    const formData = new FormData()
    formData.append('file', file?.[0])
    mutation.mutate(formData)
  }

  const fileSelected = watch('file')

  return (
    <div className="bg-blueGray-200 rounded-md p-8 space-y-6">
      <header className="text-sm space-y-2">
        <h2 className="text-xl font-medium">Create a new Dataset</h2>
        <DatasetRequirementsList />
      </header>
      <FileDetails file={fileSelected?.[0]} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-md">
          <Input
            type="file"
            id="create-dataset"
            label="Dataset file"
            name="file"
            ref={register}
            error={errors.email}
            required
          />
          <ActionButton disabled={!isValid || mutation.isLoading}>
            {mutation.isLoading ? <Spinner className="w-3 h-3" /> : 'Submit'}
          </ActionButton>
          <ClosePanelButton type="button" onClick={onClose}>
            Close Panel
          </ClosePanelButton>
        </div>
      </form>
      <MutationError
        isError={mutation.isError}
        error="There was an error creating the dataset"
        description={(mutation.error as ErrorMessage)?.message}
      />
    </div>
  )
}
