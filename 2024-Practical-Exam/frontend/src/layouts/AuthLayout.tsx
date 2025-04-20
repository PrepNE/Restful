import React from "react"
import Typography from 'antd/es/typography/Typography'
import { Layout } from "antd";
import Link from 'antd/es/typography/Link'





const AuthLayout = ({ children }: { children: React.ReactElement}) => {
const Text = Typography;
  return (
    <Layout className="site-layout bg-white min-h-screen flex flex-col text-[#333] items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
            {children}

            <div className="hidden md:block lg:block lg:h-[400px] md:h-[300px] max-md:mt-10">
                    <Link href="/" className="font-bold justify-center pb-10 flex=row flex items-center lg:ml-2.5">
                        <img src="/logo.svg" className="h-6 mr-4" alt="Windster Logo" />
                        <Text className="self-center whitespace-nowrap text-xl flex flex-row justify-center items-center"><Text className='text-primary text-2xl'>E</Text>-Libra</Text>
                    </Link>
                    <img src="/images/library.png" className="w-full h-full object-cover" alt="Experience" />
                </div>
        </div>
    </Layout>
  )
}

export default AuthLayout