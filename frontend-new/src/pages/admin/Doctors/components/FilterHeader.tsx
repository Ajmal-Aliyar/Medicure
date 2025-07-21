import InputWithIcon from '@/components/ui/InputWithIcon'
import { Search } from 'lucide-react'


export const FilterHeader = ({
    query,
    onChangeQuery
}: {
    query: string;
    onChangeQuery: (q: string) => void;
}) => {

    return (
        <div className={`w-full flex justify-between text-primary`}>
            <h4 className="font-semibold flex">Doctors</h4>
                <InputWithIcon
                    value={query}
                    onChange={onChangeQuery}
                    placeholder="Search Doctor..."
                    icon={<Search className="w-4 h-4" />}
                    className="max-w-60 w-full"
                />
        </div>
    )
}
