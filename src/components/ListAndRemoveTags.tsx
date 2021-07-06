export function ListAndRemoveTags({id, tags, onSubmit}) {
  if (tags?.length === 1) {
    return (
      <div>
        <Tag className="bg-blueGray-50 mb-2">{tags[0]}</Tag>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap">
      {tags?.map(tag => (
        <div key={`${id}-${tag}`} className="group flex mr-2 mb-2">
          <Tag className="bg-pink-50 rounded-r-none">{tag}</Tag>
          <button
            className={cn(
              'cursor-pointer px-2 rounded-r-md text-white items-center flex bg-red-400',
              'hover:bg-red-800',
              'disabled:bg-gray-300 disabled:cursor-not-allowed'
            )}
            disabled={mutation.isLoading}
            onClick={() => deleteTag(tag)}>
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
