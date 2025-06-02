import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense, use } from "react";

export default function PostInModal({params}:{params: Promise<{ id: string }>}){
    const { id } = use(params);
    return(
        <Modal>
            <Suspense fallback={<Preloader/>}>
                <ModalPostContent postId={id}/>
            </Suspense>
        </Modal>
    );
}