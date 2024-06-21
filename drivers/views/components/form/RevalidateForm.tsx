import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useFormState } from 'react-hook-form'

import {
  revalidatePageInput,
  RevalidatePageInput,
} from '@/application/interfaces/inputs/RevalidatePageInput'

import InputControl from '@/drivers/views/components/form/InputControl'
import { useTypeSafeForm } from '@/drivers/views/hooks/form'

const RevalidateForm = () => {
  const form = useTypeSafeForm<RevalidatePageInput>({
    defaultValues: { path: '/' },
    resolver: zodResolver(revalidatePageInput),
  })
  const nextRouter = useRouter()
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<RevalidatePageInput> = ({ path }) => {
    setLoading(true)
    nextRouter.push('/dashboard/revalidate?path=' + path)
  }
  const { isValid } = useFormState(form)
  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h2>ページのデータを更新</h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <InputControl<RevalidatePageInput> label="パス" fieldName="path" />
          <button
            disabled={!isValid}
            type="submit"
            className="rounded-lg bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            更新
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default RevalidateForm
