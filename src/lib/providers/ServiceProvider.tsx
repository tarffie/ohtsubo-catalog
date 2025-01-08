import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";
import { fetchServiceFromApi } from "../utils/apiUtils";
import { ServiceInput, Service } from "@/lib/interfaces/Service";

interface ServiceContextType {
  isSidebarVisible: boolean;
  setIsSidebarVisible: Function;
  currentService: ServiceInput | undefined;
}

interface ChildrenProps {
  children: ReactNode;
}

const noop = () => {};

const ServiceContext = createContext<ServiceContextType>({
  isSidebarVisible: false,
  setIsSidebarVisible: noop,
  currentService: undefined,
});

export function ServiceProvider({ children }: ChildrenProps) {
  const [currentService, setCurrentService] = useState<ServiceInput>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const searchParams = useParams();
  const id = searchParams?.id;

  useEffect(() => {
    if (id) {
      fetchServiceFromApi("get", `${id}`)
        .then((data) => setCurrentService(data))
        .catch((error) => console.error(error));
    } else {

    }
  }, [id]);

  const contextValue = {
    isSidebarVisible,
    currentService,
    setIsSidebarVisible,
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
