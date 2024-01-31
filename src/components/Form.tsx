import { User } from "../types/User"
import {useState, FormEvent} from 'react'
import { validate } from "../utils/validate"



const Form = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false);

  const [erros, setErros] = useState<User | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErros(null);

    const data: User = {
      name, email, agree
    }

    const validateErros = validate(data);

    console.log(data, validateErros)

    if(Object.keys(validateErros).length > 0){
        setErros(validateErros)
        return;
    }

    setName("")
    setEmail("")
    setAgree(false)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
              <label className="text-sm" htmlFor="name">Nome</label>  
              <input value={name} onChange={(e) => setName(e.target.value) } type="text" placeholder="Digite o seu nome" className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"/>
              {erros?.name && <small className="text-xs text-red-500 mt-1">{erros?.name}</small>}
          </div> 

        

          <div className="flex flex-col">
              <label className="text-sm" htmlFor="email">Email</label>  
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Insira seu melhor e-mail" className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"/>
              {erros?.email && <small className="text-xs text-red-500 mt-1">{erros?.email}</small>}
          </div> 

          

          <div className="flex flex-col">
              <a href="#" className="text-xs underline mb-2">Leia os termos</a>
              <div className="flex gap-2 items-center">
                <input checked={agree} onChange={(e) => setAgree(e.target.checked)} type="checkbox" />
                <label className="text-sm" htmlFor="agree">Concordo com os termos</label>
              </div>
              {erros?.agree && <small className="text-xs text-red-500 mt-1">{erros?.agree}</small>}
          </div>

          <button type="submit" className="bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 px-4 rounded-lg text-white mt-3">Cadastrar</button>
    </form>
  )
}

export default Form