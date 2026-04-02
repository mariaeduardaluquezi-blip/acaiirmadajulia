import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AcaiLojaDashboard(){
  const [pedidos,setPedidos] = useState([]);
  const [cliente,setCliente] = useState("");
  const [valor,setValor] = useState("");

  const [pedidos99,setPedidos99] = useState([]);
  const [cliente99,setCliente99] = useState("");
  const [valor99,setValor99] = useState("");

  const [estoque,setEstoque] = useState([
    {item:"Garrafa 300ml",qtd:0},
    {item:"Garrafa 500ml",qtd:0},
    {item:"Paçoca",qtd:0},
    {item:"Granola",qtd:0},
    {item:"Nutella",qtd:0},
    {item:"Banana",qtd:0},
    {item:"Morango",qtd:0},
    {item:"Leite condensado",qtd:0},
    {item:"Leite em pó",qtd:0},
    {item:"Sucrilhos",qtd:0},
    {item:"Confete",qtd:0},
    {item:"Oreo",qtd:0},
    {item:"Ovomaltine",qtd:0},
    {item:"Creme de paçoca",qtd:0},
    {item:"Creme de maracujá",qtd:0}
  ]);

  const totalVendas = pedidos.reduce((acc,p)=> acc + Number(p.valor),0);
  const totalVendas99 = pedidos99.reduce((acc,p)=> acc + Number(p.valor),0);

  function adicionarPedido(){
    if(!cliente || !valor) return;

    const novoPedido = {
      cliente,
      valor:Number(valor),
      data:new Date().toLocaleDateString()
    };

    setPedidos([...pedidos,novoPedido]);
    setCliente("");
    setValor("");
  }

  function adicionarPedido99(){
    if(!cliente99 || !valor99) return;

    const novoPedido = {
      cliente: cliente99,
      valor:Number(valor99),
      data:new Date().toLocaleDateString()
    };

    setPedidos99([...pedidos99,novoPedido]);
    setCliente99("");
    setValor99("");
  }

  function excluirPedido(index){
    const novos = pedidos.filter((_,i)=> i !== index);
    setPedidos(novos);
  }

  function excluirPedido99(index){
    const novos = pedidos99.filter((_,i)=> i !== index);
    setPedidos99(novos);
  }

  function alterarQtd(index,valor){
    const novo = [...estoque];
    novo[index].qtd = Number(valor);
    if(novo[index].qtd < 0) novo[index].qtd = 0;
    setEstoque(novo);
  }

  return (
    <div className="p-6 grid gap-6 bg-purple-100 min-h-screen">

      <h1 className="text-3xl font-bold text-purple-900">Sistema da Loja de Açaí</h1>

      <Card className="border-purple-300">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-purple-800">Novo Pedido (Balcão / WhatsApp)</h2>
          <div className="flex gap-2 mt-3">
            <Input placeholder="Nome do cliente" value={cliente} onChange={e=>setCliente(e.target.value)} />
            <Input placeholder="Valor" type="number" value={valor} onChange={e=>setValor(e.target.value)} />
            <Button className="bg-purple-700 hover:bg-purple-800" onClick={adicionarPedido}>Adicionar</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-300">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-purple-800">Controle de Vendas</h2>
          <p className="mt-2 font-semibold">Total vendido: R$ {totalVendas}</p>
          <ul className="mt-3 space-y-2">
            {pedidos.map((p,i)=> (
              <li key={i} className="flex justify-between items-center bg-white p-2 rounded">
                <span>{p.data} - {p.cliente} - R$ {p.valor}</span>
                <Button className="bg-red-500 hover:bg-red-600" onClick={()=>excluirPedido(i)}>
                  Excluir
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-purple-300">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-purple-800">Pedidos via 99</h2>
          <div className="flex gap-2 mt-3">
            <Input placeholder="Nome do cliente" value={cliente99} onChange={e=>setCliente99(e.target.value)} />
            <Input placeholder="Valor" type="number" value={valor99} onChange={e=>setValor99(e.target.value)} />
            <Button className="bg-purple-700 hover:bg-purple-800" onClick={adicionarPedido99}>Adicionar</Button>
          </div>

          <p className="mt-4 font-semibold">Total vendido pela 99: R$ {totalVendas99}</p>

          <ul className="mt-3 space-y-2">
            {pedidos99.map((p,i)=> (
              <li key={i} className="flex justify-between items-center bg-white p-2 rounded">
                <span>{p.data} - {p.cliente} - R$ {p.valor}</span>
                <Button className="bg-red-500 hover:bg-red-600" onClick={()=>excluirPedido99(i)}>
                  Excluir
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-purple-300">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-purple-800">Estoque (Manual)</h2>
          {estoque.map((e,i)=> (
            <div key={i} className="flex justify-between items-center mt-3">
              <span className="font-medium">{e.item}</span>
              <Input
                type="number"
                value={e.qtd}
                onChange={(ev)=>alterarQtd(i,ev.target.value)}
                className="w-24"
              />
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
