import { useForm } from 'react-hook-form'
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    }
  })



  function onSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(7),
      status: "yapılacak"
    });
    reset()
  }



  return (
    <form className='taskForm' onSubmit={handleSubmit(onSubmit)} >


      <div className='form-line'>
        <label className='input-label'>
          Başlık
          <input className="input-text" type="text" {...register("title",
            {
              required: "Task başlığı yazmalısınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı"
              }
            }
          )} />
        </label>
        <p className='error-message'>{errors.title?.message}</p>
      </div>





      <div className="form-line">
        <label className="input-label">
          Açıklama
          <textarea className="input-textarea" rows="3" {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı"
            }
          })}></textarea>
        </label>
        <p className="input-error">{errors.description?.message}</p>
      </div>





      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((kisi) => (
            <label className="input-checkbox" key={kisi}>
              {kisi}
              <input type="checkbox" value={kisi} {...register("people", {
                validate: (value) => {
                  if (!value || value.length < 1)
                    return "Lütfen en az bir kişi seçin"
                  if (value.length > 3)
                    return "En fazla 3 kişi seçebilirsiniz"
                  return true
                }
              })} />
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>





      <div className='form-line'>
        <button type='submit' className='submit-button' disabled={!isValid}>Kaydet</button>
      </div>


    </form >
  );
}
