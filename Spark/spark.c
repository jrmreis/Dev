#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <time.h>
#include <sys/time.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <sys/un.h>
#include <arpa/inet.h>
#include <sys/ipc.h> 
#include <sys/shm.h> 
#include <poll.h> 
#include <mqueue.h>

#include "FAIB0000.h"
#include "FAIBI025.h"

 SD_MESSAGE *ptr_SEND;
 CL_COVER   *ptr_COVER;

 struct sockaddr_in Local;
 
 FILE *fMsg;

 char pMsg[80],
//      IP  [32] = "54.232.37.40";
      IP  [32] = "127.0.0.1";

 short sock[10];

#include "GLOBAL.h"

/*---------------------------------------------------------------------
 *     Abre Socket
 *--------------------------------------------------------------------*/
 
 short Sockets(int port)
{
 short sock;

   sock = socket(AF_INET, SOCK_STREAM, 0);
       if (sock < 0)
       {
	   printf("spark [%d] - %s\n", errno, strerror(errno));
           return(sock);
       }

   Local.sin_family      = AF_INET;
   Local.sin_addr.s_addr = inet_addr(IP);
   Local.sin_port        = htons(port);

   memset(&(Local.sin_zero), 0x00, sizeof(Local.sin_zero));
   
   tSock = sizeof(struct sockaddr_in);

   Result = connect(sock, (struct sockaddr *)&Local, tSock);
       if (Result < 0)
       {
           printf("spark [%d] - %s\n", errno, strerror(errno));
           close(sock);
           return(Result);
       }

   printf("spark OPEN SOCKET [%d] %s:%d\n", sock, IP, port);

   return(sock);
}

/*-----------------------------------------------------------------------------
 *     Pega TIMESTAMP em microsegundos
 *-----------------------------------------------------------------------------*/

 time_t GetTim(char *DATE, char *TIME, char *MILI, char *LCT)
{
 time_t GMT,
        now,
        micro;

 struct tm      *tm;
 struct timeval tv;

   gettimeofday(&tv, NULL);
   GMT = (1000000 * tv.tv_sec) + tv.tv_usec;

   tm = localtime(&tv.tv_sec);

   strftime(DATE, 10, "%Y%m%d", tm);
   strftime(TIME, 10, "%H%M%S", tm);

   micro = tv.tv_usec / 1000;
   sprintf(MILI, "%03ld", micro);

   sprintf(LCT, "%s.00", tm->tm_zone);

   return(GMT);
}

/*-----------------------------------------------------------------------------
 *     Check Client Vivo
 *         POLLIN    There is data to read.
 *         POLLRDHUP (since Linux 2.6.17)
 *                   Stream socket peer closed connection, or shut down writing
 *                   half of connection.  The _GNU_SOURCE feature test macro must
 *                   be defined (before including any header files) in order to
 *                   obtain this definition.
 *         POLLERR   Error condition (only returned in revents; ignored in events).
 *                   This bit is also set for a file descriptor referring to the
 *                   write end of a pipe when the read end has been closed.
 *
 *        timeout    Note that the timeout interval will be rounded up to the system clock
 *                   granularity, and kernel scheduling delays mean that the blocking
 *                   interval may overrun by a small amount.  Specifying a negative value
 *                   in timeout means an infinite timeout.  Specifying a timeout of zero
 *                   causes poll() to return immediately, even if no file descriptors are
 *                   ready.
 *-----------------------------------------------------------------------------*/

 short Alive(short xFD) 
{
 char buf[1024];

 short tam,
       err;

 struct pollfd pfd;

   pfd.fd      = xFD;
   pfd.events  = POLLIN | POLLRDHUP | POLLERR;
   pfd.revents = 0;

   tam = 0;

   while (pfd.revents == 0)
   {
       err = poll(&pfd, 1, -1);    // call poll timeout mileseconds
	       if (err < 0)
		   {
		       printf("SPARK err [%d]\n", err);
			   return(err);
		   }    
		       
           if (pfd.revents & POLLIN)
               tam = recv(pfd.fd, buf, capa, MSG_PEEK | MSG_DONTWAIT);
           else                    // POLLERR | POLLRDHUP
           {
               printf("SPARK - ALIVE ??? [%d] %d\n", err, pfd.revents);
               tam = -1;
               pfd.revents = 65;
           }
   }      

   return(tam);  
}	

/*---------------------------------------------------------------------
 *     Simula terminal 
 *--------------------------------------------------------------------*/

 short SendMsg(short age, short nage, short yes)

{
 char *i,
       pan  [20],
       Data [16],
       hora [16],
       Mili [16],
       LCT  [16],
       aux  [32],
       buf  [2048];

 short n,
       r,
       ho,
       tot,
       nSock;

 unsigned int cpo,
              calc = true,
              randx,
              delay;

 time_t GMT;

 pid_t pid;

    printf("\n");

    pid = fork();
       if (pid == 0)
       {
	   nSock = sock[age];

           age++;

           r = 0;
           n = 0;

           sprintf(pan, "%02d", age);
           strncat(pan, (char *)&ptr_SEND->FL_MESG.FL_PAN[2], 17);

               if (yes == true)
		           printf("PAN [%s]\n", pan);

   loop:
           memset(buf,       0x00, sizeof(buf));
           memset(ptr_COVER, 0x20, sizeof(CL_COVER));

           sprintf(ptr_COVER->IH_COVER.IH_MSGLEN, "%08d", tmsg);
           sprintf(ptr_COVER->IH_COVER.IH_EXTHDRLEN, "%04d", ext);

           strncpy(ptr_COVER->IH_COVER.IH_MSG_TYPE, "CRE", 3);

           memset(ptr_COVER->IH_COVER.FILLER2, 0X41, sizeof(ptr_COVER->IH_COVER.FILLER2));

           GMT = GetTim(Data, hora, Mili, LCT);
           sprintf(aux, "%ld", GMT);
           strncpy(ptr_COVER->IH_COVER.IH_INITTIME, aux, 16);

           strncpy(ptr_COVER->IH_COVER.IH_WAIT, "Y", 1);
           strncpy(ptr_COVER->IH_COVER.IH_WAIT_INTERVAL, "00001", 1);

           sprintf(aux, "SPARK_%02d", age);
           strncpy(ptr_COVER->IH_COVER.IH_SOURCE, aux, 8);
           
           sprintf(aux, "ECLAGE_%02d", age);
           strncpy(ptr_COVER->IH_COVER.IH_DEST, aux, 9);

           GMT = GetTim(Data, hora, Mili, LCT);

           strncpy(ptr_SEND->FL_HEADER.FL_RECORDCREATIONDATE,         Data, 8);
           strncpy(ptr_SEND->FL_HEADER.FL_RECORDCREATIONTIME,         hora, 6);
           strncpy(ptr_SEND->FL_HEADER.FL_RECORDCREATIONMILLISECONDS, Mili, 3);
           strncpy(ptr_SEND->FL_HEADER.FL_GMTOFFSET,                  LCT,  3);

           i = pan + 15;
           sprintf(i, "%04d", n);

           strncpy(ptr_SEND->FL_MESG.FL_PAN, pan, 19);

           i = buf; 
           memcpy(i, (char *)ptr_COVER, capa);

           i = i + capa;
           memset(i, 0x23, ext);
           i = i + ext;
           memcpy(i, (char *)&ptr_SEND->FL_HEADER.FL_WORKFLOW, tmsg);

           tot =  capa + ext + tmsg;

               if (yes == true)
                   printf("\nSEND > [%d] %s\n", tot, buf);

               if (send(nSock, buf, tot, 0) < 0)
                   printf("spark %d [%d] %s\n", nSock, errno, strerror(errno));

           memset(aux, 0x00, sizeof(aux));
           strncpy(aux, hora, 2);
           ho = atoi(aux);

           if (ho > 0 && ho < 9)
		   cpo = 1000000 / 50;
               else
		   if (ho > 8 && ho < 12)
		       cpo = 1000000 / 100;
                   else
		       if (ho > 11 && ho < 14)
		           cpo = 1000000 / 300;
                       else    
		           if (ho > 13 && ho < 17)
		               cpo = 1000000 / 200;
                           else
		                       if (ho > 16 && ho < 20)
		                           cpo = 1000000 / 100;
                               else    
				                   cpo = 1000000 / 25;

//           delay = (cpo * nage) - (cpo * nage * 60 / 100);
           delay = cpo * nage;

               if (calc == true)
               {
                   srand(age);
                   randx = rand() %9999;
                   calc = false;
               }    

               if (r == randx)
               {
                   calc = true;
                   r    = 0;
                   sleep(2);
               }    
               else
                   usleep(delay);  

           r++;

           n++;
               if (n > 9999)
                   n = 0;

               if (yes == false)
                   goto loop;

           printf("SPARK EXIT [%02d]\n", age);

           close(nSock);

           exit(0);
       }

   return(0);
}

#include "GetParm.h"

/*-----------------------------------------------------------------------------
 *     Recebe mensagem ECLAGE 
 *-----------------------------------------------------------------------------*/

 short RecMsg(short n, short yes)
{
 char *i,
       buf  [2048],
       Data [16],
       hora [16],
       Mili [16],
       LCT  [16],
       aux  [32];

 short nSock,
       lido,
       tot,
       tam,
       loop = true;
	
 time_t GMT,
	GMTi,
	GMTf;

 pid_t pid;

   nSock = sock[n];

   pid = fork();
       if (pid == 0)
       {
           while (loop == true)
           {
               Len = Alive(nSock);
                   if (Len > 0)
                   {
                       memset(buf, 0x00, sizeof(buf));

                       tam = read(nSock, buf, capa);   // Recebe menssagem ECLAGE 
                           if (tam < 12) 
                               printf("spark RECV %d n", tam);
                           else
                           {
                               strncpy((char *)ptr_COVER, buf, tam);

                               memset(aux, 0x00, sizeof(aux));
                               strncpy(aux, ptr_COVER->IH_COVER.IH_MSGLEN, 8);
                               tmsg = atoi(aux);

                               memset(aux, 0x00, sizeof(aux));
                               strncpy(aux, ptr_COVER->IH_COVER.IH_EXTHDRLEN, 4);
                               ext = atoi(aux);

                               tot = capa + ext + tmsg;

                               Len  = tot - tam;       // Len = quanto falta ler
                                   if (Len == 0)       // Len = 0 => leitura copleta
                                       lido = tot;
                                   else
                                       lido = tam;     // Len > 0 => atualiza Lido

                               i = buf + lido;         // ponteiro para fim do buffer de recepcao

                               while(lido < tot)       // loop para ler ate tamanho de uma mensagem = 1618 bytes
                               {	                   // tamaho da capa + tamamho extend header + tamanho da mensagem
                                   tam = read(nSock, i, Len); 
                                       if (tam < 0)
                                       {
                                           sprintf(Str, "-> ERRO READ LOOP [%d] - %s", errno, strerror(errno));
                                           printf("%s\n", Str);
                                       }
                                   lido = lido + tam;
                                   i    = i + tam;
                                   Len = tot - lido;
                               }

                               if (yes == true)
                               {
                                   sprintf(aux, "SPARK_%02d", n);
                                   printf("RECV [%d] [%s] - %s\n", lido, buf, aux);
                               }  
                           }    
                   }
				   else
                   {
                       printf("SPARK EXIT [%d]\n", n);

                       loop = false;
                       close(nSock);
                   }
           }    

           exit(0);
       }

   return(0);
}

/*---------------------------------------------------------------------
 *     Inicio SPARK 
 *--------------------------------------------------------------------*/

 int main(int argc, char *argv[])
{
 char *j,
       name[32];

 char *i;

 key_t key;

 short n,
       yes = false,
       procs;

 unsigned long GMT;

   system ("clear");

       if (argc < 4)
       {	       
           printf("ERRO PARAMETROS\n");
           exit(-1);
       }

   procs = atoi(argv[1]);      // numero de agentes 

   yes = atoi(argv[2]);      // numero de agentes 
       if (yes > 1)
           yes = false;
      
   strcpy(name, argv[3]);      // nome do arquivo de mensagem modelo

   fMsg = fopen(name, "rb");
       if (fMsg == NULL)
       {
           sprintf(Str, "ERRO [%d] - %s", errno, strerror(errno));
           exit (-1);
       }

   printf("\n");

   ptr_SEND   = (SD_MESSAGE *) malloc(sizeof(SD_MESSAGE));
   ptr_COVER  = (CL_COVER *) malloc(sizeof(CL_COVER));

   memset(ptr_SEND, 0x20, sizeof(SD_MESSAGE));

   tmsg = fread((char *)&ptr_SEND->FL_HEADER.FL_WORKFLOW, 1, 2048, fMsg);
       if (tmsg <= 0)
           exit (-1);	       

   tmsg--;
 
   capa = (sizeof(CL_COVER)); 
   ext  = 200;    

   for (n = 0; n < procs; n++)
   {
       sock[n] = Sockets(9000);
           if (sock[n] < 0) 
               exit(-1);

       printf("SPARK_[%02d] %d\n", n, sock[n]);

       RecMsg(n, yes);	   

       Result = SendMsg(n, procs, yes);
   }    

   printf("spark EXIT\n");

   exit(0);
}

