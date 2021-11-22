import { AbiItem } from "web3-utils";
import { useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Transition } from "@headlessui/react";
import useWeb3 from "../hooks/useWeb3";
import InputField from "../components/form/InputField";

interface IAccount {
  address: string;
  balance: number;
}

const Wallet = () => {
  const web3 = useWeb3();
  const [account, setAccount] = useState<IAccount | undefined>();
  const [transferring, setTransferring] = useState<boolean>(false);
  const [txn, setTxn] = useState<string>("");
  const tokenAddress = "0x6ea260bc7588965f394ab8144f2d16fae9345759";
  const minABIBalance: AbiItem[] = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  const minABITransfer: AbiItem[] = [
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
  ];

  const setData = async () => {
    if (web3?.eth) {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(minABIBalance, tokenAddress);
      const result = await contract.methods.balanceOf(accounts[0]).call();
      const format = web3.utils.fromWei(result);

      setAccount({ ...account, address: accounts[0], balance: +format });
    }
  };

  const transferToken = async (toAddress: string, tokenAmount: number) => {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(minABITransfer, tokenAddress);
    const value = web3.utils
      .toBN(tokenAmount)
      .mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
    contract.methods
      .transfer(toAddress, value)
      .send({ from: accounts[0] })
      .on("transactionHash", (hash: string) => {
        setTxn(hash);
        setTransferring(false);
      })
      .on("error", () => {
        setTransferring(false);
      });
  };

  useEffect(() => {
    setData();
  }, [web3]);

  const formik = useFormik({
    initialValues: {
      accountAddress: "",
      amount: 0,
    },
    validationSchema: Yup.object({
      accountAddress: Yup.string().required("An address is required"),
      amount: Yup.number()
        .moreThan(0, "Token amount must be greater than 0")
        .required("Please enter an amount of Neko Token."),
    }),
    onSubmit: async (values: FormikValues) => {
      if (window.confirm("Are you sure the Address and Amount is valid?")) {
        setTransferring(true);
        await transferToken(values.accountAddress, values.amount);
      }
    },
  });

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Wallet Info</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Account Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Some information about current selected account.
                </p>
              </div>
              <div className="border-t border-gray-200">
                {account && (
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
                        {account.address}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Neko Coin Balance
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {account.balance} <strong>NKT</strong>
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Transfer Token
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Transfer your Neko token to other account.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <Transition
                  show={txn !== ""}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <div className="flex justify-center items-center my-4 mx-6 font-medium bg-white rounded-md text-green-700 bg-green-100 border border-green-100">
                    <div slot="avatar">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle w-5 h-5 mx-2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div className="text-base font-normal  max-w-full flex-initial">
                      <div className="py-2">
                        <strong>Transaction success</strong>
                        <div className="text-sm font-base">
                          Your transaction hash is{" "}
                          <strong>
                            <a
                              href={`https://testnet.bscscan.com/tx/${txn}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {txn}
                            </a>
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-auto flex-row-reverse">
                      <div className="mr-4">
                        <svg
                          onClick={() => setTxn("")}
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-5 h-5 ml-2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Transition>
                <form onSubmit={formik.handleSubmit}>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        <InputField
                          id="accountAddress"
                          placeHolder="Account address"
                          label="Account address"
                          value={formik.values.accountAddress}
                          onChange={formik.handleChange}
                          errorMessage={formik.errors.accountAddress}
                          showError={
                            !!(
                              formik.touched.accountAddress &&
                              formik.errors.accountAddress
                            )
                          }
                        />
                      </dt>
                      <dd />
                    </div>
                    <div className="bg-gray-50 px-4 pb-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        <InputField
                          id="amount"
                          type="number"
                          placeHolder="Token amount"
                          label="Token amount"
                          value={formik.values.amount}
                          onChange={formik.handleChange}
                          errorMessage={formik.errors.amount}
                          showError={
                            !!(formik.touched.amount && formik.errors.amount)
                          }
                        />
                      </dt>
                      <dd />
                    </div>
                    <div className="bg-gray-50 px-4 pb-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        <button
                          disabled={transferring}
                          type="submit"
                          className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3 md:mt-0"
                        >
                          Transfer
                        </button>
                      </dt>
                      <dd />
                    </div>
                  </dl>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
