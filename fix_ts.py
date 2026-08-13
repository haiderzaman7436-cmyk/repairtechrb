import glob, re

# Fix Shop*.tsx that lack priceNum
for f in glob.glob('src/pages/Shop*.tsx'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We need to find products that don't have priceNum
    def add_price_num(match):
        obj_str = match.group(0)
        if 'priceNum' not in obj_str:
            price_match = re.search(r'price:\s*[\'\"\`](R?\s*[\d,]+(\.\d+)?)[\'\"\`]', obj_str)
            if price_match:
                price_str = price_match.group(1).replace('R', '').replace(' ', '').replace(',', '')
                try:
                    pnum = float(price_str)
                    return obj_str[:-1] + f', priceNum: {pnum}' + '}'
                except: pass
        return obj_str
    
    new_content = re.sub(r'\{[^{}]*price:\s*[\'\"\`][^\'\"\`]+[\'\"\`][^{}]*\}', add_price_num, content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)

# Fix CategoryProductCard.tsx
f = 'src/components/shop/CategoryProductCard.tsx'
content = open(f).read()
content = content.replace('priceNum: number;', 'priceNum?: number;')
content = content.replace('title, price, priceNum } = props;', 'title, price } = props;')
with open(f, 'w') as out: out.write(content)

# Fix ShopHeader.tsx
f = 'src/components/shop/ShopHeader.tsx'
content = open(f).read()
content = content.replace('Menu, X, LogOut } from \'lucide-react\'', 'Menu, X } from \'lucide-react\'')
with open(f, 'w') as out: out.write(content)

# Fix AuthContext.tsx
f = 'src/context/AuthContext.tsx'
content = open(f).read()
content = content.replace('const login = async (email: string, pass: string) => {', 'const login = async (email: string, _pass: string) => {')
content = content.replace('const register = async (email: string, pass: string, name: string) => {', 'const register = async (email: string, _pass: string, name: string) => {')
with open(f, 'w') as out: out.write(content)

# Fix AdminDashboard.tsx
f = 'src/pages/AdminDashboard.tsx'
content = open(f).read()
content = content.replace('Users, ShoppingBag, DollarSign, LayoutDashboard, Settings, LogOut', 'Users, ShoppingBag, DollarSign, LogOut')
with open(f, 'w') as out: out.write(content)

print('Fixed errors')
