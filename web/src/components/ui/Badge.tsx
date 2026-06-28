interface BadgeProps {
  children: React.ReactNode;
  bg: string;
  color: string;
  dot?: boolean;
}

export function Badge({ children, bg, color, dot }: BadgeProps) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:999, background:bg, color, fontSize:12, fontWeight:600 }}>
      {dot && <span style={{ width:6, height:6, borderRadius:99, background:color }} />}
      {children}
    </span>
  );
}
