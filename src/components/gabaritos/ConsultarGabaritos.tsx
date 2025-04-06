
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GabaritoMock } from '@/types/gabaritos';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Trash, Eye, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ConsultarGabaritosProps {
  gabaritos: GabaritoMock[];
}

const ConsultarGabaritos: React.FC<ConsultarGabaritosProps> = ({ gabaritos: initialGabaritos }) => {
  const [gabaritos, setGabaritos] = useState<GabaritoMock[]>(initialGabaritos);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentGabarito, setCurrentGabarito] = useState<GabaritoMock | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleDelete = (gabarito: GabaritoMock) => {
    setCurrentGabarito(gabarito);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentGabarito) {
      setGabaritos(prev => prev.filter(item => item.id !== currentGabarito.id));
      toast.success(`Gabarito "${currentGabarito.avaliacao}" excluído com sucesso`);
      setDeleteDialogOpen(false);
      setCurrentGabarito(null);
    }
  };

  const handleView = (gabarito: GabaritoMock) => {
    setCurrentGabarito(gabarito);
    setViewDialogOpen(true);
  };

  const handleEdit = (gabarito: GabaritoMock) => {
    toast.info(`Editando gabarito: ${gabarito.avaliacao}`, {
      description: "Funcionalidade em desenvolvimento"
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Gabaritos Cadastrados</CardTitle>
            <CardDescription>
              Visualize e gerencie os gabaritos das avaliações
            </CardDescription>
          </div>
          <Button 
            onClick={() => {
              toast.success("Novo gabarito adicionado", {
                description: "Você pode cadastrar os detalhes na aba 'Cadastrar Gabarito'"
              });
            }}
          >
            Adicionar Gabarito
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-center">Questões</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gabaritos.length > 0 ? (
                  gabaritos.map((gabarito) => (
                    <TableRow key={gabarito.id}>
                      <TableCell className="font-medium">{gabarito.avaliacao}</TableCell>
                      <TableCell>{new Date(gabarito.data).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-center">{gabarito.questoes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleView(gabarito)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Visualizar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(gabarito)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(gabarito)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhum gabarito encontrado. Adicione um novo gabarito na aba "Cadastrar Gabarito".
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir o gabarito "{currentGabarito?.avaliacao}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Gabarito Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentGabarito?.avaliacao}</DialogTitle>
            <DialogDescription>
              Detalhes do gabarito cadastrado em {currentGabarito && new Date(currentGabarito.data).toLocaleDateString('pt-BR')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: currentGabarito?.questoes || 0 }).map((_, index) => (
                <div key={index} className="border rounded-md p-2 text-center bg-muted">
                  <div className="font-medium text-xs">Q{index + 1}</div>
                  <div className="font-bold">{['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)]}</div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsultarGabaritos;
