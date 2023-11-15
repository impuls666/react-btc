type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input({ value, onChange }: Props) {
  return (
    <div className="flex justify-center">
      <input
        className="p-2 text-2xl border rounded-lg border-white/10 bg-blue-950"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
