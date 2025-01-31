import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { notFound, useParams } from "next/navigation";
import { fetchServiceFromApi } from "../utils/apiUtils";
import { Service } from "@/lib/interfaces/Service";

interface ServiceContextType {
  currentService: Service | undefined;
  shoppingCart: Array<Service> | [];
  setShoppingCart: Function;
}

interface ChildrenProps {
  children: ReactNode;
}

const noop = () => {};

const ServiceContext = createContext<ServiceContextType>({
  currentService: undefined,
  shoppingCart: [],
  setShoppingCart: noop,
});

export function ServiceProvider({ children }: ChildrenProps) {
  const [currentService, setCurrentService] = useState<Service>();
  const [shoppingCart, setShoppingCart] = useState([]);

  const searchParams = useParams();
  const id = searchParams?.id;

  useEffect(() => {
    if (id) {
      fetchServiceFromApi("get", `${id}`).then((data) =>
        setCurrentService(data),
      );
    } else {
      return notFound();
    }
  }, [id]);

  const contextValue = {
    currentService,
    shoppingCart,
    setShoppingCart,
  };

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
