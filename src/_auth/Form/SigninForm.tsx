import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link,useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useState } from "react"


const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser,isLoading:isUserLoading}=useUserContext();
  const {mutateAsync: signInAccount}=useSignInAccount();
  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    setIsSubmitting(true);
    
    try {
      const session = await signInAccount(values);

      if(!session){
        form.setError('password', {
          message: 'Invalid email or password'
        });
        form.setValue('password', '');
        
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if(isLoggedIn){
        form.reset();
        navigate('/');
      } else {
        toast({
          title: "Sign-in failed. Please try again",
          variant: "destructive"
        })
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo2.png" className="w-28 h-28 object-contain" />
          <h2 className="h3-bold md:h2-bold">Sign in to your account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back to Snaply, please enter your details</p>


          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 w-full mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
            {isSubmitting || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
            
            <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign-Up</Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  )
}

export default SigninForm;